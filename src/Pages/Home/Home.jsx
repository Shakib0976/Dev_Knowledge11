import { use } from 'react';
import TopContributor from '../../Layouts/TopContributor';
import Banner from '../Banner/Banner';
import ExploreCategory from '../LatestArticle/ExploreCategory';
import LatestArticle from '../LatestArticle/LatestArticle';
import Scarch from './Scarch';


const Home = () => {







    return (


        <div className="grid grid-cols-1 lg:grid-cols-9">
            {/* Main Content Area – spans 6 columns on large screens */}
            <main className="lg:col-span-6 md:px-10 md:mt-10 lg:px-16">
                <Banner />
                <LatestArticle />
            </main>

            {/* Right Sidebar – spans 3 columns on large screens */}
            <aside className="lg:col-span-3   hidden lg:block sticky top-25 h-screen overflow-y-auto p-4 
                    dark:bg-gradient-to-r dark:from-black dark:shadow-[0_0_5px_rgba(110,69,226,0.5),_0_0_10px_rgba(136,211,206,0.3)] 
                    border-base-100">
                {/* Sidebar content */}
                <div>
                    <div className="w-full max-w-md mx-auto mt-2 md:mt-6 px-4">
                        <Scarch></Scarch>
                    </div>
                </div>
            </aside>
        </div>

    );
};


export default Home;

