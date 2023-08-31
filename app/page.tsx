'use client';

import ActivityGraph from "./components/graph";
import Sidebar from "./components/sidebar";
import { Provider } from "react-redux";
import { store } from "./model/store";

export default function Home() {
  return (
    <Provider store={store}>
      <div className="flex flex-row">
        <div
          className="
            graph-section
            w-3/5
            h-screen
            pt-[71px]
            pb-[43px]
            pl-8
            pr-4
          "
        >
          <ActivityGraph />
        </div>
        <Sidebar />
      </div>
    </Provider>
  );
}
