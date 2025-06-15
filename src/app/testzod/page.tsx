"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import TextFields from "@/components/TextFields";
import Button from "@/components/Button";
import Checkbox from "@/components/CheckBox";

// 🎯 Zod schema
const schema = z.object({
  firstName: z
    .string()
    .min(1, "skriv dit navn"),

  age: z
    .number({
      invalid_type_error: "det skal være et nummer",
      required_error: "Skal udfyldes",
    })
    .int("skal være et helt tal")
    .positive("skal være positiv")
    .min(18, "du skal være over 18")
    .max(99, "du skal være under 99"),

  email: z
    .string()
    .email("ikke en gyldig email"),

  terms: z
    .literal(true, {
      errorMap: () => ({ message: "Du skal acceptere vores betingelser" }),
    }),
});

type FormData = z.infer<typeof schema>; // 🔒 typesikkerhed direkte fra schemaet

export default function Home() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: FormData) => {
    console.log(data);
  };

  return (
    <div className="w-full max-w-xs mx-auto my-10">
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextFields label="FirstName" {...register("firstName")} />
        <span className="text-gray-400 text-sm">
          {errors.firstName?.message}
        </span>

        <TextFields label="Age" type="number" {...register("age", { valueAsNumber: true })} />
        <span className="text-gray-400 text-sm">
          {errors.age?.message}
        </span>

        <TextFields label="Email" type="email" {...register("email")} />
        <span className="text-gray-400 text-sm">
          {errors.email?.message}
        </span>

        <Checkbox label="Acceptere vores betingelser" {...register("terms")} />
        <span className="text-gray-400 text-sm">
          {errors.terms?.message}
        </span>

        <Button />
      </form>
    </div>
  );
}
