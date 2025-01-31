import React, { useCallback, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

import { PasswordIcon } from "@/app/icons/password";

const UserSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().required("Password is required"),
  role: Yup.string().required("Role is required"),
});

interface UserFormProps {
  initialData?: { name: string; email: string; role: string; password: string };
  onSubmit: (data: {
    name: string;
    email: string;
    role: string;
    password: string;
  }) => void;
}

const UserForm: React.FC<UserFormProps> = ({ initialData, onSubmit }) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePassword = useCallback(
    (e: any) => {
      e.preventDefault();
      setShowPassword((prev) => !prev);
    },
    []
  );

  return (
    <Formik
      initialValues={
        initialData || { name: "", email: "", password: "", role: "" }
      }
      validationSchema={UserSchema}
      onSubmit={(values, { resetForm }) => {
        onSubmit(values);
        resetForm();
      }}
    >
      {({ isSubmitting }) => (
        <Form className="space-y-4">
          <div>
            <label className="block font-bold">Name</label>
            <Field
              data-testid="name"
              name="name"
              className="w-full border px-2 py-1"
              placeholder="Enter name"
            />
            <ErrorMessage
              name="name"
              component="div"
              className="text-red-500 text-sm"
            />
          </div>
          <div>
            <label className="block font-bold">Email</label>
            <Field
              name="email"
              type="email"
              data-testid="email"
              className="w-full border px-2 py-1"
              placeholder="Enter email"
            />
            <ErrorMessage
              name="email"
              component="div"
              className="text-red-500 text-sm"
            />
          </div>
          {!initialData && (
            <div>
              <label className="block font-bold">Password</label>
              <div className="relative">
                <Field
                  name="password"
                  type={showPassword ? "text" : "password"}
                  data-testid="password"
                  className="w-full border px-2 py-1 pr-9"
                  placeholder="Enter password"
                />
                <button className="absolute top-1/2 -translate-y-1/2 right-2" onClick={handleTogglePassword}>
                  <PasswordIcon />
                </button>
              </div>
              <ErrorMessage
                name="password"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>
          )}
          <div>
            <label className="block font-bold">Role</label>
            <Field
              name="role"
              as="select"
              className="w-full border px-2 py-1"
              data-testid="role"
            >
              <option value="">Select Role</option>
              <option value="Admin">Admin</option>
              <option value="User">User</option>
            </Field>
            <ErrorMessage
              name="role"
              component="div"
              className="text-red-500 text-sm"
            />
          </div>
          <button
            data-testid="submit"
            type="submit"
            disabled={isSubmitting}
            className="bg-green-500 text-white px-4 py-2 rounded"
          >
            {isSubmitting ? "Submitting..." : "Submit"}
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default UserForm;
