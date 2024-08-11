import ClipLoader from "react-spinners/ClipLoader";

function Loading() {
  return (
    <div className="bg-background flex flex-1 justify-center items-center">
      <ClipLoader
        color="hsl(var(--primary))"
        loading={true}
        // cssOverride={override}
        size={150}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  );
}

export default Loading;
