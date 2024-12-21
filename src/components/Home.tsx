import { lazy, Suspense } from "react";
const Activity = lazy(() => import("./Activity"));
const Discount = lazy(() => import("./Discount"));
const Teachers = lazy(() => import("./Teachers"));
const Media = lazy(() => import("./Media"));
const AutoSlider = lazy(() => import("./Slider"));
const Courses = lazy(() => import("./Courses"));
const News = lazy(() => import("./News"));

const Home: React.FC = () => {
  return (
    <div className="flex-1">
      <Suspense fallback={<div>Loading...</div>}>
        <AutoSlider />
        <Courses />
        <Discount />
        <Activity />
        <News />
        <Teachers />
        <Media />
      </Suspense>
    </div>
  );
};
export default Home;
