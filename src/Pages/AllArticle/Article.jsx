import React from 'react';
import { useLoaderData } from 'react-router';

const Article = () => {
    const data = useLoaderData();
    console.log(data);
    return (
        <div>
            <h1>article</h1>
        </div>
    );
};

export default Article;