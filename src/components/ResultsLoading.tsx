import Skeleton from "@mui/material/Skeleton";

//To get this component to load, we just need to pass through
//what a single articles height would be. Consider mobile vs desktop sizing.
const ResultsLoading = ({ height = "100%", width = "100%" }) => {
  return (
    <Skeleton
      variant="rounded"
      width={width}
      height={height}
      animation="pulse"
    />
  );
};

export default ResultsLoading;
