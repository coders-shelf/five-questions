import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import { updateSubject } from "../../../actions/subjects";
import SubjectForm from "./SubjectForm";
import SubjectFormLayout from "../../layout/SubjectFormLayout";

const SubjectEdit = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const item = useSelector(state => state.subjects.subject);
  const { register, handleSubmit } = useForm();
  const onSubmit = data => {
    data.id = item.id;
    dispatch(updateSubject(data));
    history.push("/detail/" + item.id);
  };
  return (
    <SubjectFormLayout title="編集">
      <SubjectForm
        handleSubmit={handleSubmit}
        register={register}
        onSubmit={onSubmit}
        title={item.title}
      />
    </SubjectFormLayout>
  );
};

export default SubjectEdit;
