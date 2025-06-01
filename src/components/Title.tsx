interface TitleProps {
  text: string;
  variant?: 'h1' | 'h2';
}

export const Title = ({ text, variant }: TitleProps) => {
  return (
    <>
      {variant === 'h1' ? (
        <h1 className="scroll-m-20 text-center text-4xl font-extrabold tracking-tight text-balance">
          {text}
        </h1>
      ) : (
        <h2 className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0">
          {text}
        </h2>
      )}
    </>
  );
};
