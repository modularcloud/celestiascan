import * as React from "react";
import { chunkArray, isElementOverflowing } from "~/lib/shared-utils";

type UseItemGridArgs<T> = {
  noOfColumns: number;
  /**
   * The ref of the parent to attach keyboard events
   */
  scopeRef: React.RefObject<HTMLElement | null>;
  /**
   * Callback for when the item is clicked, either with the mouse
   * or with Enter key
   */
  onSelectOption?: (option: T) => void;
  /**
   * The list of groups to display into grids, this should be memoized or else
   *  it could cause too many rerenders
   */
  optionGroups: { [groupDisplayName: string]: T[] };
  /**
   * The default key to show first in the list
   */
  defaultOptionGroupKeyToSortFirst?: string;
};

/**
 * Hook to make navigable menus with grid/list (a list is just a grid with one column) in groups
 * @returns
 */
export function useItemGrid<
  T extends { id: string } | { readonly id: string },
>({
  noOfColumns,
  optionGroups,
  defaultOptionGroupKeyToSortFirst,
  onSelectOption,
  scopeRef,
}: UseItemGridArgs<T>) {
  const itemRootId = React.useId();
  const groupedByLines = React.useMemo(() => {
    let groups = Object.entries(optionGroups);
    if (
      defaultOptionGroupKeyToSortFirst &&
      optionGroups[defaultOptionGroupKeyToSortFirst]
    ) {
      groups = groups.sort((a, b) => {
        if (a[0] === defaultOptionGroupKeyToSortFirst) {
          return -1;
        }
        if (b[0] === defaultOptionGroupKeyToSortFirst) {
          return 1;
        }
        return 0;
      });
    }

    return chunkArray(groups, noOfColumns);
  }, [noOfColumns, optionGroups, defaultOptionGroupKeyToSortFirst]);

  const [selectedRowIndex, setSelectedRowIndex] = React.useState(0);
  const [selectedColIndex, setSelectedColIndex] = React.useState(0);

  const [selectedOption, setSelectedOption] = React.useState<T | null>(null);

  // BEWARE : BIG HACK !!!
  // We store these values in double to avoid recreating the useEffect whenever one of them changes
  const selectedItemPositionRef = React.useRef({
    rowIndex: selectedRowIndex,
    colIndex: selectedColIndex,
    option: selectedOption,
  });

  const selectOption = React.useCallback(
    ({
      rowIndex,
      colIndex,
      option,
    }: {
      option: T | null;
      rowIndex?: number;
      colIndex?: number;
    }) => {
      // we default to the ref values as they have the previous values in store
      const newRowIndex =
        rowIndex !== undefined
          ? rowIndex
          : selectedItemPositionRef.current.rowIndex;
      const newColIndex =
        colIndex !== undefined
          ? colIndex
          : selectedItemPositionRef.current.colIndex;

      setSelectedRowIndex(newRowIndex);
      setSelectedColIndex(newColIndex);
      setSelectedOption(option);

      // Sync this ref state, so that the values we use inside of the `useEffect` are up to date
      selectedItemPositionRef.current = {
        option,
        rowIndex: newRowIndex,
        colIndex: newColIndex,
      };
    },
    [],
  );

  /**
   * 1- Navigating up/down has 3 cases :
   *    - inside of the same column
   *       ⮑ if the selectedOption index is between 0 and less than groupIndex - 1
   *    - between rows
   *       ⮑ when the selectedOption index is equal to groupIndex - 1, when change rows
   *          and select the first item of the next row  if the key is ArrowDown
   *          or the last item of previous row if the key is ArrowUp
   *    - Stuck
   *       ⮑  when there is no next row (for `ArrowDown`) or previous row (for `ArrowUp`)
   */
  const moveSelectionDown = React.useCallback(() => {
    const { rowIndex, colIndex, option } = selectedItemPositionRef.current;
    if (!groupedByLines?.[rowIndex]?.[colIndex]) return; // don't do anything if undefined

    const [_, currentGroupOptions] = groupedByLines[rowIndex][colIndex];

    let selectedOptionIndex = currentGroupOptions.findIndex(
      (item) => item.id === option?.id,
    );

    if (selectedOptionIndex === -1) {
      // we select the first element of the group if there is none selected
      selectOption({
        option: currentGroupOptions[0],
        rowIndex: 0,
        colIndex: 0,
      });
    } else if (
      selectedOptionIndex >= 0 &&
      selectedOptionIndex < currentGroupOptions.length - 1
    ) {
      // navigation between the same group
      selectOption({
        option: currentGroupOptions[selectedOptionIndex + 1],
      });
    } else if (rowIndex < groupedByLines.length - 1) {
      // navigation between rows
      const [_, nextGroupOptions] = groupedByLines[rowIndex + 1][colIndex];
      selectOption({
        option: nextGroupOptions[0],
        rowIndex: rowIndex + 1,
      });
    }
  }, [groupedByLines, selectOption]);

  const moveSelectionUp = React.useCallback(() => {
    const { rowIndex, colIndex, option } = selectedItemPositionRef.current;
    if (!groupedByLines?.[rowIndex]?.[colIndex]) return; // don't do anything if undefined

    const [_, currentGroupOptions] = groupedByLines[rowIndex][colIndex];

    let selectedOptionIndex = currentGroupOptions.findIndex(
      (item) => item.id === option?.id,
    );

    // we don't do anything here
    if (selectedOptionIndex === -1) return;

    if (
      selectedOptionIndex > 0 &&
      selectedOptionIndex <= currentGroupOptions.length - 1
    ) {
      // navigation between the same group
      selectOption({
        option: currentGroupOptions[selectedOptionIndex - 1],
      });
    } else if (rowIndex > 0) {
      // navigation between rows
      const [_, nextGroupOptions] = groupedByLines[rowIndex - 1][colIndex];

      selectOption({
        option: nextGroupOptions[nextGroupOptions.length - 1], // select last index of the row up
        rowIndex: rowIndex - 1,
      });
    }
  }, [groupedByLines, selectOption]);

  /**
   * 1- Navigating left/right has 2 cases :
   *    - between columns
   *       ⮑ when the column index is between 0 and groupedByLines[rowIndex] - 1, when change columns
   *          and select the item in the same position on the nextGroup
   *          if this position doesn't correspond to any item, we select the first item
   *    - Stuck
   *       ⮑  when there is no next column (for `ArrowRight`) or previous column (for `ArrowLeft`)
   */
  const moveSelectionRight = React.useCallback(() => {
    const { rowIndex, colIndex, option } = selectedItemPositionRef.current;
    if (!groupedByLines?.[rowIndex]?.[colIndex]) return; // don't do anything if undefined

    const [_, currentGroupOptions] = groupedByLines[rowIndex][colIndex];

    let selectedOptionIndex = currentGroupOptions.findIndex(
      (item) => item.id === option?.id,
    );

    if (selectedOptionIndex === -1) {
      // we select the first element of the group if there is none selected
      selectOption({
        option: currentGroupOptions[0],
        rowIndex: 0,
        colIndex: 0,
      });
    } else if (
      colIndex >= 0 &&
      colIndex < groupedByLines[rowIndex].length - 1
    ) {
      // navigation between the same group
      const [_, nextGroupOptions] = groupedByLines[rowIndex][colIndex + 1];

      let nextOption = nextGroupOptions[selectedOptionIndex];
      if (!nextOption) {
        nextOption = nextGroupOptions[0];
      }

      selectOption({
        option: nextOption,
        colIndex: colIndex + 1,
      });
    }
  }, [groupedByLines, selectOption]);

  const moveSelectionLeft = React.useCallback(() => {
    const { rowIndex, colIndex, option } = selectedItemPositionRef.current;
    if (!groupedByLines?.[rowIndex]?.[colIndex]) return; // don't do anything if undefined

    const [_, currentGroupOptions] = groupedByLines[rowIndex][colIndex];

    let selectedOptionIndex = currentGroupOptions.findIndex(
      (item) => item.id === option?.id,
    );

    if (selectedOptionIndex === -1) return;

    if (colIndex > 0 && colIndex <= groupedByLines[rowIndex].length - 1) {
      // navigation between the same group
      const [_, nextGroupOptions] = groupedByLines[rowIndex][colIndex - 1];

      let nextOption = nextGroupOptions[selectedOptionIndex];
      if (!nextOption) {
        nextOption = nextGroupOptions[0];
      }

      selectOption({
        option: nextOption,
        colIndex: colIndex - 1,
      });
    }
  }, [groupedByLines, selectOption]);

  const scrollOptionIntoView = React.useCallback(() => {
    const { rowIndex, colIndex, option } = selectedItemPositionRef.current;

    if (option) {
      // scroll option into view
      const element = document.getElementById(
        `${itemRootId}-row-${rowIndex}-col-${colIndex}-option-${option.id}`,
      ) as HTMLDivElement | null;

      element?.scrollIntoView({
        block: "nearest",
      });
    }
  }, [itemRootId]);

  const getOptionId = React.useCallback(
    (rowIndex: number, colIndex: number, option: T) => {
      return `${itemRootId}-row-${rowIndex}-col-${colIndex}-option-${option.id}`;
    },
    [itemRootId],
  );

  React.useEffect(() => {
    const navigationListener = (event: KeyboardEvent) => {
      /**
       * Prevent default scrolling in favor of manual scrolling
       * TODO (fredk3): (re)figure out why i did this ?
       */
      if (event.key === "ArrowUp" || event.key === "ArrowDown") {
        event.preventDefault();
      }

      /**
       * we want to listen on `Enter` key to select an item,
       * but only once and not listen for repeated presses.
       * This fixes a bug with the search modal, where if you
       * clicked on `Enter` it would skip one step, Enter was detected & repeated
       */
      const { option: currentOption } = selectedItemPositionRef.current;
      if (event.key === "Enter" && !event.repeat && currentOption) {
        onSelectOption?.(currentOption);
        // we don't want this event to be propagated to the whole page
        // so that element that listen globally (for hotkey for ex.) don't react accordingly
        event.stopPropagation();
        return;
      }

      let eventHandled = true;

      switch (event.key) {
        case "ArrowUp":
          moveSelectionUp();
          scrollOptionIntoView();
          break;
        case "ArrowDown":
          moveSelectionDown();
          scrollOptionIntoView();
          break;
        case "ArrowLeft":
          moveSelectionLeft();
          break;
        case "ArrowRight":
          moveSelectionRight();
          break;
        default:
          eventHandled = false;
          // we don't care for other key events
          break;
      }

      // we don't want this event to be propagated to the whole page
      // so that element that listen globally (for hotkey for ex.) don't react accordingly,
      if (eventHandled) {
        event.stopPropagation();
      }
    };

    const scope = scopeRef?.current;

    if (!scope) return;

    scope.addEventListener("keydown", navigationListener);
    return () => {
      scope.removeEventListener("keydown", navigationListener);
    };
  }, [
    groupedByLines,
    moveSelectionDown,
    moveSelectionUp,
    moveSelectionLeft,
    moveSelectionRight,
    scrollOptionIntoView,
    onSelectOption,
    itemRootId,
    scopeRef,
  ]);

  React.useEffect(() => {
    /**
     * Reset the selection everytime the number of columns changes
     * This is a fix for bugs when the window get resized
     *   ⮑ this bug happens when there is an active selection and the number of columns get reduced (from 3 to 2 for ex)
     *      if we try to use arrow keys to move the selection, it will throw an 'undefined' error because that column is empty
     *      to fix it, we just reset the selected column to 0
     */
    const defaultSelectedItem = groupedByLines[0]?.[0]?.[1]?.[0];
    selectOption({
      option: defaultSelectedItem ?? null,
      rowIndex: 0,
      colIndex: 0,
    });
  }, [selectOption, groupedByLines]);

  const isOptionSelected = React.useCallback(
    (rowIndex: number, colIndex: number, option: T) => {
      return (
        selectedOption?.id === option.id &&
        selectedColIndex === colIndex &&
        selectedRowIndex == rowIndex
      );
    },
    [selectedOption, selectedColIndex, selectedRowIndex],
  );

  const registerOptionProps = React.useCallback(
    (rowIndex: number, colIndex: number, option: T) => {
      const isSelected =
        selectedOption?.id === option.id &&
        selectedColIndex === colIndex &&
        selectedRowIndex == rowIndex;

      return {
        id: `${itemRootId}-row-${rowIndex}-col-${colIndex}-option-${option.id}`,
        onClick: () => onSelectOption?.(option),
        onMouseMove: () => {
          const element = document.getElementById(
            `${itemRootId}-row-${rowIndex}-col-${colIndex}-option-${option.id}`,
          );
          element?.focus();
          selectOption({ option, rowIndex, colIndex });
        },
        onFocus: () => {
          selectOption({ option, rowIndex, colIndex });
        },
        onBlur: () => {
          selectOption({
            option: null,
            rowIndex: 0,
            colIndex: 0,
          });
        },
        role: "option",
        "aria-selected": isSelected,
        tabIndex: isSelected ? -1 : 0,
      };
    },
    [
      itemRootId,
      selectedOption,
      selectedColIndex,
      selectedRowIndex,
      onSelectOption,
      selectOption,
    ],
  );

  return {
    groupedByLines,
    selectedOption,
    selectedColIndex,
    selectedRowIndex,
    selectOption,
    getOptionId,
    isOptionSelected,
    registerOptionProps,
  };
}
