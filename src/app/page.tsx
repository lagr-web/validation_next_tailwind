//src/app/page.tsx

"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import TextFields from "@/components/TextFields";
import Button from "@/components/Button";
import Checkbox from "@/components/CheckBox";

import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

type FormData = {
  firstName: string;
  age: number;
};

export default function Home() {


  const schema = yup.object().shape({
    
    firstName: yup
      .string()
      .required("skriv dit navn"),
    age: yup
      .number()
      .typeError("det skal være et nummer")
      .required("Skal udfyldes")
      .positive()
      .integer()
      .min(18, "du skal være over 18")
      .max(99, "du skal være under 99"),
    email: yup
      .string()
      .email("ikke en gyldig email")
      .required("Skal udfyldes"),
    terms: yup
      .bool()
      .oneOf([true], 'Du skal acceptere vores betingelser')


  })

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });


  const onSubmit: SubmitHandler<FormData> = (data) => console.log(data);

  return (

    <>
      <div className="w-full max-w-xs mx-auto my-10 ">

        <form onSubmit={handleSubmit(onSubmit)}>

          {/*  <div className="mb-5">
            <label className="block text-gray-700 text-md font-bold mb-1">FirstName</label>
            <input id="firstName" type="text" className="shadow border-gray-300 border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
          </div> */
          }

          <TextFields
            label="FirstName"
            {...register("firstName")}
          />
          <span className="text-gray-400 text-sm">
            {errors.firstName?.message}
          </span>


          {/*    <div className="mb-5">
            <label className="block text-gray-700 text-md font-bold mb-1">Age</label>
            <input id="age" type="number" className="shadow border-gray-300 border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
          </div>  */}

          <TextFields
            label="Age"
            type="number"
            {...register("age")}
          />
          <span color="muted">
            {errors.age?.message}
          </span>

          <TextFields
            label="Email"
            type="email"
            {...register("email")}
          />
          <span>
            {errors.email?.message}
          </span>

          <div className="mb-2"></div>


          <Checkbox
            label="Acceptere vores betingelser"
            {...register("terms")}
          />
           <span>
            {errors.terms?.message}
          </span>


          <Button />

          {/* <div className="grid justify-end">
            <button className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Submit</button>
          </div> */}

        </form>
      </div>

    </>


  )

}
