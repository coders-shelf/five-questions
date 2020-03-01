import React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import { createSubject } from "../../../actions/subjects";
import SubjectForm from "./SubjectForm";
import SubjectFormLayout from "../../layout/SubjectFormLayout";

const SubjectCreate = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { register, handleSubmit } = useForm();
  const onSubmit = data => {
    dispatch(createSubject(data));
    history.push("/");
  };
  return (
    <SubjectFormLayout title="新規作成">
      <SubjectForm
        handleSubmit={handleSubmit}
        register={register}
        onSubmit={onSubmit}
      />
    </SubjectFormLayout>
  );
};

export default SubjectCreate;
