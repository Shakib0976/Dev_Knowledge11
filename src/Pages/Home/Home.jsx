import Extra1 from '../../Layouts/Extra1';
import TopContributor from '../../Layouts/TopContributor';
import Banner from '../Banner/Banner';
import ExploreCategory from '../LatestArticle/ExploreCategory';
import LatestArticle from '../LatestArticle/LatestArticle';


const Home = () => {



    return (
        <div>
            <Banner></Banner>
            <LatestArticle></LatestArticle>
            <ExploreCategory></ExploreCategory>
            <TopContributor></TopContributor>
            <Extra1></Extra1>


        </div>
    );
};


export default Home;

