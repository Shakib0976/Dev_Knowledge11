import React from 'react';
import { MdOutlineRocketLaunch } from 'react-icons/md';
import ExploreCategory from '../LatestArticle/ExploreCategory';
import TopContributor from '../../Layouts/TopContributor';
import Extra1 from '../../Layouts/Extra1';

const About = () => {
    return (
        <div>

            <div className='lg:flex  gap-5 md:p-20 p-5 my-10'>
                <div className='lg:w-[50%]'>
                    <h1 className='text-4xl flex font-bold my-10'><MdOutlineRocketLaunch /> Our Mission</h1>
                    <p className='my-2 text-lg text-gray-600 dark:text-gray-400'>At KnowledgeHub, we believe that knowledge is meant to be shared. Our platform connects curious learners with passionate experts, creating a vibrant ecosystem where insights flow freely and everyone can contribute to the collective wisdom.</p>
                    <p className='text-lg text-gray-600 dark:text-gray-400'>Whether you're sharing your expertise, learning something new, or simply exploring different perspectives, KnowledgeHub provides the tools and community you need to make meaningful connections through knowledge.</p>

                </div>
                <div className='bg-gradient-to-br my-3 lg:w-[50%] justify-center flex flex-col space-y-12  text-center from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800 p-12 px-20 rounded-lg shadow-md'>
                    <div className='flex justify-between items-center'>
                        <div className='text-blue-600'>
                            <h1 className='text-4xl  font-bold mb-1'>10k+</h1>
                            <p>Articles Shared</p>
                        </div>
                        <div className='text-green-600'>
                            <h1 className='text-4xl  font-bold mb-1'>50k+</h1>
                            <p>Knowledge Seekers</p>
                        </div>
                    </div>

                    <div className='flex justify-between items-center'>
                        <div className='text-purple-600'>
                            <h1 className='text-4xl  font-bold mb-1'>5k+</h1>
                            <p>Active Writers</p>
                        </div>
                        <div className='text-red-600'>
                            <h1 className='text-4xl  font-bold mb-1'>100k+</h1>
                            <p>Topics Covered</p>
                        </div>
                    </div>
                </div>
            </div>


            <div className='  py-20'>
                <div className='w-11/12 mx-auto'>
                    <h1 className='text-4xl font-bold text-center mt-5 mb-2'>Meet Our Team</h1>
                    <p className='text-center mb-12'>The passionate individuals behind KnowledgeHub, working to make knowledge sharing accessible to everyone</p>

                    <div className='grid grid-col-1 md:grid-cols-2 lg:grid-cols-3 gap-10 rounded-2xl'>
                        <div className='shadow-lg bg-gray-200 text-center dark:bg-gray-800 py-8 px-8 justify-center items-center rounded-2xl flex flex-col'>
                            <img className='w-25 h-25 rounded-full border-2 border-blue-500' src="https://i.ibb.co/VWy5yRJN/man-smiling-with-hands-hips-1187-3017.jpg" alt="" />
                            <h1 className='text-2xl font-semibold my-2'>Sarah Johnson</h1>
                            <p className='text-blue-500 mb-5'>Founder & CEO</p>
                            <p>Passionate about democratizing knowledge and building communities.</p>
                        </div>

                        <div className='shadow-lg bg-gray-200 text-center dark:bg-gray-800 py-8 px-8 justify-center items-center rounded-2xl flex flex-col'>
                            <img className='w-25 h-25 rounded-full border-2 border-blue-500' src="https://i.ibb.co/4Zd6DC9Q/confident-young-man-handsome-young-man-keeping-arms-crossed-smiling-while-standing-against-white-bac.jpg" alt="" />
                            <h1 className='text-2xl font-semibold my-2'>Shakib Khan</h1>
                            <p className='text-blue-500 mb-5'>Head of Community</p>
                            <p>Dedicated to fostering meaningful connections and discussions.</p>
                        </div>

                        <div className='shadow-lg bg-gray-200 text-center dark:bg-gray-800 py-8 px-8 justify-center rounded-2xl items-center flex flex-col'>
                            <img className='w-25 h-25 rounded-full border-2 border-blue-500' src="https://i.ibb.co/HfzXdQJx/handsome-young-man-plain-clothes-160672-5188.jpg" alt="" />
                            <h1 className='text-2xl font-semibold my-2'>Emily Davis</h1>
                            <p className='text-blue-500 mb-5'>Lead Developer</p>
                            <p>Building the technical foundation for knowledge sharing.</p>
                        </div>
                    </div>
                </div>
            </div>


            <ExploreCategory></ExploreCategory>
            <TopContributor></TopContributor>
            <Extra1></Extra1>
        </div>
    );
};

export default About;