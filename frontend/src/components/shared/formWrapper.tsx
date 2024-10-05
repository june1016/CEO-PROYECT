// src/components/shared/formWrapper.tsx
"use client";
import React from "react";
import {
  useForm,
  Controller,
  FieldValues,
  SubmitHandler,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button, Input } from "@nextui-org/react";

interface FormField {
  name: string;
  label: string;
  type: string;
  placeholder?: string;
  validation?: z.ZodTypeAny;
}

interface FormWrapperProps<T extends FieldValues> {
  fields: FormField[];
  onSubmit: SubmitHandler<T>;
  schema: z.ZodObject<any>;
  submitText: string;
}

export function FormWrapper<T extends FieldValues>({
  fields,
  onSubmit,
  schema,
  submitText,
}: FormWrapperProps<T>) {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<T>({
    resolver: zodResolver(schema),
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {fields.map((field) => (
        <Controller
          key={field.name}
          name={field.name as any}
          control={control}
          render={({ field: { onChange, value } }) => (
            <Input
              label={field.label}
              type={field.type}
              placeholder={field.placeholder}
              onChange={onChange}
              value={value as string}
              errorMessage={errors[field.name]?.message as string}
            />
          )}
        />
      ))}
      <Button type="submit" color="primary" isLoading={isSubmitting}>
        {submitText}
      </Button>
    </form>
  );
}
