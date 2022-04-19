import { Form } from "react-bootstrap";

function ProfilePics(){

    return(
        <div className="profile-pic-drop-content">

            {/* User Pics */}
            <Form.Check
                type="radio"
                value="user-badge-purple.svg"
                name="profilepic"
            />
            <img src={`../../../images/user-badge-purple.svg`} className="pic-options" alt="User Avatar" />

            <Form.Check
                type="radio"
                value="user-blue.svg"
                name="profilepic"
            />
            <img src={`../../../images/user-blue.svg`} className="pic-options" alt="User Avatar" />

            <Form.Check
                type="radio"
                value="user-green.svg"
                name="profilepic"
            />
            <img src={`../../../images/user-green.svg`} className="pic-options" alt="User Avatar" />

            <Form.Check
                type="radio"
                value="user-pink.svg"
                name="profilepic"
            />
            <img src={`../../../images/user-pink.svg`} className="pic-options" alt="User Avatar" />

            <Form.Check
                type="radio"
                value="user-red.svg"
                name="profilepic"
            />
            <img src={`../../../images/user-red.svg`} className="pic-options" alt="User Avatar" />

            <Form.Check
                type="radio"
                value="user-yellow.svg"
                name="profilepic"
            />
            <img src={`../../../images/user-yellow.svg`} className="pic-options" alt="User Avatar" />


            {/* Duck Pics */}
            <Form.Check
                type="radio"
                value="duck-blue.svg"
                name="profilepic"
            />
            <img src={`../../../images/duck-blue.svg`} className="pic-options" alt="User Avatar" />

            <Form.Check
                type="radio"
                value="duck-orange.svg"
                name="profilepic"
            />
            <img src={`../../../images/duck-orange.svg`} className="pic-options" alt="User Avatar" />

            <Form.Check
                type="radio"
                value="duck-red.svg"
                name="profilepic"
            />
            <img src={`../../../images/duck-red.svg`} className="pic-options" alt="User Avatar" />


            {/* Elephant Pics */}
            <Form.Check
                type="radio"
                value="elephant-blue.svg"
                name="profilepic"
            />
            <img src={`../../../images/elephant-blue.svg`} className="pic-options" alt="User Avatar" />

            <Form.Check
                type="radio"
                value="elephant-green.svg"
                name="profilepic"
            />
            <img src={`../../../images/elephant-green.svg`} className="pic-options" alt="User Avatar" />

            <Form.Check
                type="radio"
                value="elephant-yellow.svg"
                name="profilepic"
            />
            <img src={`../../../images/elephant-yellow.svg`} className="pic-options" alt="User Avatar" />


            {/* Turtle Pics */}
            <Form.Check
                type="radio"
                value="turtle-green.svg"
                name="profilepic"
            />
            <img src={`../../../images/turtle-green.svg`} className="pic-options" alt="User Avatar" />

            <Form.Check
                type="radio"
                value="turtle-orange.svg"
                name="profilepic"
            />
            <img src={`../../../images/turtle-orange.svg`} className="pic-options" alt="User Avatar" />

            <Form.Check
                type="radio"
                value="turtle-purple.svg"
                name="profilepic"
            />
            <img src={`../../../images/turtle-purple.svg`} className="pic-options" alt="User Avatar" />


            {/* Whale Pics */}
            <Form.Check
                type="radio"
                value="whale-green.svg"
                name="profilepic"
            />
            <img src={`../../../images/whale-green.svg`} className="pic-options" alt="User Avatar" />

            <Form.Check
                type="radio"
                value="whale-yellow.svg"
                name="profilepic"
            />
            <img src={`../../../images/whale-yellow.svg`} className="pic-options" alt="User Avatar" />

            <Form.Check
                type="radio"
                value="whale-purple.svg"
                name="profilepic"
            />
            <img src={`../../../images/whale-purple.svg`} className="pic-options" alt="User Avatar" />

        </div>
    );
}

export default ProfilePics;