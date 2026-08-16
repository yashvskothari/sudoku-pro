import Card from "../common/Card";

function Statistics() {
  return (
    <Card title="Statistics">

      <div className="space-y-3">

        <div className="flex justify-between">
          <span>Moves</span>
          <span>0</span>
        </div>

        <div className="flex justify-between">
          <span>Mistakes</span>
          <span>0 / 3</span>
        </div>

        <div className="flex justify-between">
          <span>Progress</span>
          <span>0%</span>
        </div>

      </div>

    </Card>
  );
}

export default Statistics;