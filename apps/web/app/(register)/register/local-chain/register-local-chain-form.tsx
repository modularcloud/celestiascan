"use client";

import { Button } from "~/ui/button";
import { Camera } from "~/ui/icons";
import { Input } from "~/ui/input";
import { LoadingIndicator } from "~/ui/loading-indicator";
import { Select, SelectContent, SelectItem } from "~/ui/select";

export type RegisterLocalChainFormProps = {};

export function RegisterLocalChainForm({}: RegisterLocalChainFormProps) {
  return (
    <form className="flex flex-col gap-4" action={async () => {}}>
      <div className="grid grid-cols-5 gap-3">
        <label className="flex items-center justify-center w-full h-full">
          <span className="sr-only">Logo</span>
          <input type="file" name="logo" id="logo" className="sr-only peer" />
          <div
            aria-hidden="true"
            className="peer-focus:ring-2 peer-focus:border peer-focus:border-primary transition duration-150 rounded-full h-[4.25rem] w-[4.25rem] border bg-muted-100 flex items-center justify-center"
          >
            <Camera className="w-4 h-4 text-muted" />
          </div>
        </label>

        <div className="col-span-2">
          <Input size="small" label="Brand" disabled defaultValue="Local" />
        </div>
        <div className="col-span-2">
          <Input
            size="small"
            label="Chain Name"
            type="text"
            placeholder="Mainnet"
            name="chainName"
            required
            defaultValue={""}
            autoFocus
            error={""}
          />
        </div>
      </div>

      <Input
        size="small"
        label="DA Layer (optional)"
        type="text"
        placeholder="00 11 446 694"
        name="daLayer"
        defaultValue={""}
        error={""}
      />

      <Input
        size="small"
        label="Namespace (optional)"
        type="text"
        placeholder="00 11 446 694"
        name="namespace"
        defaultValue={""}
        error={""}
      />

      <Input
        size="small"
        label="Start Height (optional)"
        type="text"
        placeholder="353000"
        name="startHeight"
        defaultValue={""}
        error={""}
      />

      <div className="grid grid-cols-6 place-items-end gap-3">
        <Select
          size="small"
          label="RPC"
          placeholder="Platform"
          name="rpcPlatform"
          defaultValue={"cosmos"}
          className="w-full flex-grow inline-flex col-span-2"
        >
          <SelectContent>
            <SelectItem value="cosmos">Cosmos</SelectItem>
            {/* <SelectItem value="evm">Evm</SelectItem> */}
          </SelectContent>
        </Select>
        <Input
          size="small"
          label="RPC URL"
          type="text"
          placeholder="https://..."
          className="col-span-4"
          name="rpcUrl"
          defaultValue={""}
          hideLabel
          error={""}
        />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <Input
          size="small"
          label="Token"
          type="text"
          placeholder="TIA"
          name="tokenName"
          defaultValue={""}
          error={""}
        />

        <Input
          size="small"
          label="Decimals"
          type="text"
          placeholder="16"
          name="tokenDecimals"
          defaultValue={""}
          error={""}
        />
      </div>

      <Button
        type="submit"
        color="primary"
        className="px-3 py-1 w-full md:w-auto text-center items-center justify-center gap-1 mt-6"
      >
        {/* <LoadingIndicator className="text-white h-4 w-4" /> */}
        <span>Submit</span>
      </Button>
    </form>
  );
}
