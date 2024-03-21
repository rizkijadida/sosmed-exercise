"use client";
import FormInput from "@/components/forms/FormInput";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { appConfig } from "@/utils/config";
import axios from "axios";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import React from "react";
import { toast } from "sonner";
import { RegisterValidationSchema } from "./schemas/RegisterValidationSchema";

const Register: React.FC = () => {
  const router = useRouter();
  const { baseUrl } = appConfig;

  const { errors, handleChange, handleSubmit, touched, values, handleBlur } =
    useFormik({
      initialValues: {
        name: "",
        email: "",
        password: "",
      },
      validationSchema: RegisterValidationSchema,
      onSubmit: async (values) => {
        const { data } = await axios.get(
          baseUrl + `/users?email=${values.email}`,
        );

        if (data.length) {
          return toast.error("email already exist");
        }

        await axios.post(baseUrl + "/users", {
          name: values.name,
          email: values.email,
          password: values.password,
          isVerify: false,
        });
        toast.success("register success");
        router.push("/login");
      },
    });

  return (
    <main className="container mx-auto px-4">
      <div className="flex justify-center">
        <Card className="w-[450px]">
          <CardHeader>
            <CardTitle className="text-center text-3xl  text-primary">
              Welcome to Sosmed
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <div className="grid w-full items-center gap-4">
                {/* INI NAME */}
                <FormInput
                  name="name"
                  error={errors.name}
                  isError={!!touched.name && !!errors.name}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  placeholder="Name"
                  type="text"
                  value={values.name}
                />

                {/* EMAIL */}
                <FormInput
                  name="email"
                  error={errors.email}
                  isError={!!touched.email && !!errors.email}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  placeholder="Email"
                  type="email"
                  value={values.email}
                />
                {/* PASSWORD */}
                <FormInput
                  name="password"
                  error={errors.password}
                  isError={!!touched.password && !!errors.password}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  placeholder="Password"
                  type="password"
                  value={values.password}
                />
              </div>
              <Button className="mt-6 w-full" type="submit">
                Register
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </main>
  );
};

export default Register;
