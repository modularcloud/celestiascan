"use client";

export type RegisterLocalChainFormProps = {};

export function RegisterLocalChainForm({}: RegisterLocalChainFormProps) {
  return (
    <form className="flex flex-col gap-4" action={async () => {}}>
      <div className="grid grid-cols-5 gap-3">
        <div>
          <div className="rounded-full h-12 w-12 border bg-muted-100 flex items-center justify-center"></div>
          <input type="file" name="logo" id="logo" className="sr-only" />
        </div>

        <div className="col-span-2"></div>
        <div className="col-span-2"></div>
      </div>
    </form>
  );
}
