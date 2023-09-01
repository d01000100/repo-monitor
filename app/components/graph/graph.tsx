"use client";

import { LineChart } from "@mui/x-charts";
import { DEFAULT_Y_AXIS_KEY } from "@mui/x-charts";
import { ACTIVITY_SAMPLE } from "../../github-api/data";
import lodash from "lodash";
import moment from "moment";
import { useAppSelector } from "../../model/hooks";
import { getCommitActivites } from "../../model/reposSlice";
import { FC, useMemo } from "react";
import graphStyles from "./graph.module.css"
import CommitIcon from "@/app/icons/git-commit";

interface DataPointProps {
  seriesID: number;
  dataIndex?: number;
}

interface ActivityGraphProps {}

const ActivityGraph: React.FC<ActivityGraphProps> = () => {
  const commitActivities = ACTIVITY_SAMPLE;

  const repoIDs = useMemo(() => {
    return commitActivities.map((a) => a.id);
  }, [commitActivities]);

  const graphData = useMemo<
    { week: number; [id: string]: number | string }[]
  >(() => {
    if (commitActivities.length === 0) return [];

    // Get the weeks from the first entry (we assume they're the same an all repos)
    let data = commitActivities[0].commitActivity.map((a) => ({
      week: a.week,
    }));
    commitActivities.forEach(({ id, commitActivity }) => {
      return commitActivity.forEach(({ total, week }, week_index) => {
        /* For each activity log of each repo added, we combine their total commits
          on each week "entry" of the data set */
        data[week_index] = {
          ...data[week_index],
          [`${id}_total`]: total,
          [`${id}_date`]: moment.unix(week).format("MMM D, YYYY"),
        };
      });
    });
    return data;
  }, [commitActivities]);

  const DataPoint: FC<DataPointProps> = ({ seriesID, dataIndex }) => {
    /* When the mouse is over a line, but not a specific data point, there's
    no dataIndex and no need to draw anything */
    if (!dataIndex) return;

    /* From the data point detected to be hovered,
  we recover the index of that data point on the data array */
    /* And the id of the series it belongs to: the repo id */
    /* With those two numbers, we retrieve just the data of that repo on that week */
    const total = graphData[dataIndex][`${seriesID}_total`];
    const date = graphData[dataIndex][`${seriesID}_date`];
    return (
      <div
        className={`
          ${graphStyles.dataPoint}
          bg-white
          py-2
          px-4
          flex
          flex-col
          gap-1
          items-center
          rounded
        `}
      >
        <p
          className={`
            ${graphStyles.dataPointSecondaryText}
            text-sm
            font-light
          `}
        >
          Week of {date}
        </p>
        <p
          className={`
            ${graphStyles.dataPointPrimaryText}
            text-sm
            font-bold            
          `}
        >
          <CommitIcon size={22} />&nbsp;{total} commits
        </p>
      </div>
    );
  };

  return (
    <LineChart
      margin={{
        top: 10,
        bottom: 20,
        left: 30,
      }}
      dataset={graphData}
      tooltip={{
        trigger: "item",
        itemContent: (props) => {
          /* From the data point detected to be hovered,
            we recover the index of that data point on the data array */
          const dataIndex: number | undefined = props.itemData.dataIndex;
          /* And the id of the series it belongs to: the repo id */
          const seriesID: number = props.itemData.seriesId;          
          return <DataPoint
            dataIndex={dataIndex}
            seriesID={seriesID}
          />;
        },
      }}
      leftAxis={{
        axisId: DEFAULT_Y_AXIS_KEY,
        //tickFontSize: 0,
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
      series={repoIDs.map((id) => ({
        id: id.toString(),
        dataKey: `${id}_total`,
      }))}
    />
  );
};

export default ActivityGraph;
