import "slick-carousel/slick/slick.css";
import {lazy, Suspense} from 'react'
import "slick-carousel/slick/slick-theme.css";
import Navbar from "./components/Navbar";
import Footer from "../src/components/Footer";
import { Routes, Route } from "react-router-dom";
const CourseDetail=lazy(()=>import("./components/CourseDetail"))
const Home =lazy(()=>import("./components/Home")) 
const  Courses=lazy(()=>import("./components/Courses")) 
const Activity=lazy(()=>import("./components/Activity"))
const Teachers=lazy(()=>import("./components/Teachers")) 
const Media= lazy(()=>import("./components/Media"))
const PopupForm=lazy(()=>import("./components/PopupForm"))
const News=lazy(()=>import('./components/News'))
const NewsPage=lazy(()=>import ('./components/NewsPage'))
const NewsDetailsPage=lazy(()=>import ('./components/NewsDetailsPage'))



const App: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-1">
        <Suspense fallback={<div className="text-center"></div>}>
           <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/category_details/:id" element={<CourseDetail />} />
        <Route path="/courses" element={<Courses/>}/>
        <Route path="/activity" element={<Activity/>}/>
        <Route path="/teachers" element={<Teachers/>}/>
        <Route path='/news' element={<News/>}/>
        <Route path='/newspage' element={<NewsPage/>}/>
        <Route path="/newsdetail/:id" element={<NewsDetailsPage/>}/>
        <Route path="/media" element={<Media/>}/>
        <Route path="/form" element={<PopupForm closePopup={() => {}} />} />
      </Routes>
        </Suspense>
         

      </div>
    
      <Footer />
    </div>
  );
};

export default App;
