import RemainingNumbers from "../sidebar/RemainingNumbers";
import Statistics from "../sidebar/Statistics";
import Controls from "../sidebar/Controls";

function Sidebar() {
  return (
    <aside
      className="
        w-full

        xl:w-[320px]

        space-y-5
      "
    >
      <RemainingNumbers />

      <Statistics />

      <Controls />
    </aside>
  );
}

export default Sidebar;