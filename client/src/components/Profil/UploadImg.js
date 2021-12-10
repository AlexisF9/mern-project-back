import React, {useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { uploadPicture } from "../../actions/user.actions";

const UploadImg = () => {
    const [file, setFile] = useState();
    const dispatch = useDispatch();
    const userData = useSelector((state) => state.userReducer);

    const handlePicture = (event) => {
        event.preventDefault();
        const data = new FormData();
        // on stock tout dans data
        data.append("name", userData.pseudo); // nom de l'image
        data.append("userId", userData._id); // lié avec l'utlisateur
        data.append("file", file); // photo

        dispatch(uploadPicture(data, userData._id));
    }

    return(
        <form action="" onSubmit={handlePicture} className="form-img">
            <label class="custom-file-upload">
                <input type="file" id="file" name="file" accept=".jpg, .jpeg, .png" onChange={(e) => setFile(e.target.files[0])}/>
                <i class="fas fa-cloud-download-alt"></i> Nouvelle image de profil
            </label>
            <input type="submit" value="Envoyer"/>
        </form>
    );
};

export default UploadImg;