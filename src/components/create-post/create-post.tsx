import React, {FC, useState} from "react";
import './create-post.scss'
import clip from '../../images/clip.svg'
import { useDispatch } from "../../services/types/store";
import { uploadPostReq } from "../../services/actions/user-posts";

const CreatePost: FC = () => {
    const [file, setFile] = useState<File | "">("");
    const [description, setDescription] = useState("");
    const dispatch = useDispatch()

    const uploadImage = (e: React.ChangeEvent<HTMLInputElement>) => {
        if(e.target.files) {
            setFile(e.target.files[0])
        }
    }

    const uploadPost = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const fd = new FormData();
        fd.append("description", description);
        fd.append("image", file);
        dispatch(uploadPostReq(fd));
        setFile("");
        setDescription("")
    }

    return (
        <form className="create-post-container" onSubmit={e => uploadPost(e)}>
            <textarea
                placeholder="Новый пост"
                value={description}
                onChange={e => setDescription(e.target.value)}
            />
            {file && 
                <div className="user-image">
                    <img src={URL.createObjectURL(file)} alt="user upload"/>
                    <button type="button" onClick={() => setFile("")}>&#10005;</button>
                </div>
            }
            <div className="post-utils">
                <div className="image-upload">
                    <label htmlFor="file-input">
                        <img src={clip} alt={clip}/>
                    </label>
                    <input id="file-input" type="file" onChange={(e) => uploadImage(e)} onClick={(e)=> e.currentTarget.value = ""}/>
                </div>
                <button>Поделиться</button>
            </div>
        </form>
    )
}

export default CreatePost;