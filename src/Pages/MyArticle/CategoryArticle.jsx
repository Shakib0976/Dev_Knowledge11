import React from 'react';
import { useLoaderData } from 'react-router';

const CategoryArticle = () => {
    const categoryData = useLoaderData();
    console.log(categoryData);
    return (
        <div>
            <h1>This is category article</h1>
        </div>
    );
};

export default CategoryArticle;