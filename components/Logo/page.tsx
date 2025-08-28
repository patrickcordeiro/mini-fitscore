interface LogoProps {
  fontSize?: string;
}

export default function Logo({ fontSize = "text-4xl" }: LogoProps) {
  return (
    <div className="flex items-center">
      <h1 className={`flex text-[#1A56DB] ${fontSize} font-bold`}>
        FitScore LEGAL{" "}
        <span className="text-[8px] leading-5 font-bold">TM</span>
      </h1>
    </div>
  );
}
