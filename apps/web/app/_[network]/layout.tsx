type Props = {
  children: React.ReactNode;
  rightpanel: React.ReactNode;
};

export default async function EntityLayout({ children, rightpanel }: Props) {
  return (
    <div className="lg:flex">
      <div className="bg-[url('/images/glow.svg')] bg-top bg-no-repeat lg:flex-grow lg:overflow-auto">
        <div className="relative">{children}</div>
      </div>
      <div className="flex-none">{rightpanel}</div>
    </div>
  );
}

export const dynamic = "force-dynamic";
