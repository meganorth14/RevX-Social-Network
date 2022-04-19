function CategoryPost({title, bodyContent}){


    return(

        <div className="category-container text-center">

            {/* Title */}
            <h3 className="category-subtitle">{title}</h3>

            {/* Post body content */}
            <div className="category-content">
                <p>{bodyContent}</p>
            </div>

            <div className="color-line">
                <span className="color-line-1"></span>

            </div>
        </div>

    );
}

export default CategoryPost;