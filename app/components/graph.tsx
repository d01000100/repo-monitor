"use client";

import { LineChart } from "@mui/x-charts";
import { DEFAULT_Y_AXIS_KEY } from "@mui/x-charts";
import { ACTIVITY_SAMPLE } from "../github-api/data";
import lodash from "lodash";
import moment from "moment";

interface ActivityGraphProps {}

const ActivityGraph: React.FC<ActivityGraphProps> = () => {
  const data = ACTIVITY_SAMPLE.map(({ week, total }) => {
    return {
      total,
      week,
      date: moment.unix(week).format("MMM D, YYYY"),
    };
  });

  return (
    <LineChart
      margin={{
        top: 10,
        bottom: 20,
        left: 30,
      }}
      dataset={data}
      tooltip={{
        trigger: "item",
        itemContent: (props) => {
          const dataIndex: number = props.itemData.dataIndex;
          const dataEntry = data[dataIndex];
          return (
            <div className="bg-teal-600 p-4">
              <pre className="text-black">{JSON.stringify(dataEntry)}</pre>
            </div>
          );
        },
      }}
      leftAxis={{
        axisId: DEFAULT_Y_AXIS_KEY,
        tickFontSize: 0
      }}
      bottomAxis={{
        axisId: "week",
        tickFontSize: 0,
        tickSize: 12,
      }}
      xAxis={[
        {
          id: "week",
          dataKey: "week",
        },
      ]}
      series={[
        {
          dataKey: "total",
        },
      ]}
    />
  );
};

export default ActivityGraph;
