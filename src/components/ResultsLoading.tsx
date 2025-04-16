import Skeleton from "@mui/material/Skeleton";
import { useDataState } from "../context/DataState";

//To get this component to load, we just need to pass through
//what a single articles height would be. Consider mobile vs desktop sizing.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ResultsLoading = ({ height }: any) => {
  const { templates } = useDataState();
  return (
    <Skeleton
      variant={templates?.skeleton?.variant ?? "rectangular"}
      width={templates.skeleton.width ?? "100%"}
      height={templates.skeleton.height ?? height}
      animation={templates.skeleton.animation ?? "pulse"}
      sx={{ marginY: 0, paddingY: 0 }}
    />
  );
};

export default ResultsLoading;
