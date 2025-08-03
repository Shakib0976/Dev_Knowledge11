import { use } from 'react';
import TopContributor from '../../Layouts/TopContributor';
import Banner from '../Banner/Banner';
import ExploreCategory from '../LatestArticle/ExploreCategory';
import LatestArticle from '../LatestArticle/LatestArticle';
import { AuthContext } from '../../Context/AuthContext';


const Home = () => {

    const { user } = use(AuthContext)



    return (


        <div className="flex flex-col  lg:flex-row">
            {/* Main Content Area */}
            <main className="md:px-20">
                <Banner />
                <LatestArticle />
            </main>

            {/* Right Sidebar */}
            <aside className="flex-shrink-0  
                md:w-64 lg:h-screen sticky top-25 hidden lg:block dark:bg-gradient-to-r dark:from-black 
                 border-base-100  overflow-y-hidden">
                <div>
                    {
                        user ? <aside className=" flex-1  dark:shadow-[0_0_5px_rgba(110,69,226,0.5),_0_0_10px_rgba(136,211,206,0.3)] md:w-64 md:h-screen sticky top-0 hidden lg:block dark:bg-gradient-to-r dark:from-black m-1  border-base-100 p-4 overflow-y-auto">
                            {/* ...sidebar content... */}
                            <div>
                                <h1>this is right aside</h1>
                            </div>
                        </aside>
                            : <aside className=" flex-1  dark:shadow-[0_0_5px_rgba(110,69,226,0.5),_0_0_10px_rgba(136,211,206,0.3)] md:w-64 md:h-screen sticky top-0 hidden lg:block dark:bg-gradient-to-r dark:from-black m-1  border-base-100 p-4 overflow-y-auto">
                                {/* ...sidebar content... */}
                                <div>
                                    <h1>this is right aside</h1>
                                </div>
                            </aside>}
                    {/* Main Content */}
                </div>
            </aside>
        </div>
    );
};


export default Home;

