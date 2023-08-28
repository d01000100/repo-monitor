"use client";

import { LineChart } from "@mui/x-charts";
import { ACTIVITY_SAMPLE } from "../github-api/data";
import lodash from "lodash";
import moment from "moment";

interface ActivityGraphProps {}

const ActivityGraph: React.FC<ActivityGraphProps> = () => {

  const data = ACTIVITY_SAMPLE.map(({week, total}) => {    
    return {
      total,
      week,
      date: moment.unix(week).format("MMM D, YYYY")
    }
  });

  console.log({data})

  return (
    <div style={{ width: "100%", height: "50vh" }}>
      <LineChart
        dataset={data}
        tooltip={{
          trigger: "item",
          itemContent: (props) => {
            const dataIndex : number = props.itemData.dataIndex;
            const dataEntry = data[dataIndex]
            return <div className="p-4 bg-teal-600">
              <pre className="text-black">{JSON.stringify(dataEntry)}</pre>
            </div>
          }
        }}
        xAxis={[
          {
            dataKey: "week",
          },
        ]}
        series={[
          {
            dataKey: "total",
          },
        ]}
      />
    </div>
  );
};

export default ActivityGraph;
