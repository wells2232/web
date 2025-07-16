export const AuthForm = ({
  title,
  children,
  primaryActionText,
  secondaryActionText,
  onPrimaryAction,
  onSecondaryAction,
  infoText,
}) => {
  return (
    <div className="flex w-full max-w-md flex-col">
      <div className="mb-6 flex w-full flex-col items-start justify-center gap-3">
        <h2 className="text-3xl">{title}</h2>
        {infoText && <p className="text-gray-500 text-sm">{infoText}</p>}
      </div>

      <form
        className="flex w-full flex-col items-center justify-center gap-4"
        onSubmit={onPrimaryAction}
      >
        {children}
        {primaryActionText && (
          <button
            className="mt-6 w-full max-w-md rounded-full border border-zinc-400 bg-white p-4 font-semibold text-black transition-transform hover:scale-103 hover:cursor-pointer"
            type="submit"
          >
            {primaryActionText}
          </button>
        )}
      </form>
      {secondaryActionText && (
        <button
          className="mt-4 w-full max-w-md rounded-full border border-zinc-400 bg-black p-4 text-center font-semibold text-white transition-transform hover:scale-103 hover:cursor-pointer"
          onClick={onSecondaryAction}
          type="button"
        >
          {secondaryActionText}
        </button>
      )}
    </div>
  );
};
