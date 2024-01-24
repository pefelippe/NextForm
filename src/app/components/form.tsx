import {
  Autocomplete,
  Button,
  CircularProgress,
  TextField,
} from "@mui/material";
import React from "react";
import {
  FormProvider,
  SubmitErrorHandler,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import { useQuery } from "react-query";
import { z } from "zod";

import { fetchPersons, PersonName } from "../api/fetchPersons";

const personSchema = z.object({
  id: z.number(),
  nome: z.string(),
});

const formSchema = z.object({
  pessoa: personSchema,
  telefone: z
    .string()
    .refine((value) => /^\d+$/.test(value) && value.length >= 10, {
      message: "O telefone deve ter pelo menos 10 dígitos.",
    }),
  email: z.string().email().or(z.literal("")),
});

export type FormValues = z.infer<typeof formSchema>;

interface FormProps {}

const Form: React.FC<FormProps> = () => {
  // Destructure properties from useForm
  const methods = useForm<FormValues>();
  const { handleSubmit, formState, reset, setValue, clearErrors } = methods;

  const { data: persons, isFetching } = useQuery("persons", fetchPersons);

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    console.log(data);
    reset({});
  };

  const onError: SubmitErrorHandler<FormValues> = (errors) => {
    console.error(errors);
  };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={handleSubmit(onSubmit, onError)}
        className="flex flex-col items-start gap-6 rounded-3xl shadow p-8 border"
      >
        <Autocomplete
          id="asynchronous-demo"
          sx={{ width: 450 }}
          loading={isFetching}
          options={persons || []}
          onChange={(_, value) => {
            if (value) {
              setValue("pessoa", value);
              clearErrors("pessoa");
            }
          }}
          value={methods.getValues("pessoa")}
          getOptionLabel={(option: PersonName) => option.nome}
          renderInput={(params) => (
            <TextField
              {...params}
              {...methods.register("pessoa", {
                validate: {
                  notSelected: (value) => !!value || "Selecione uma pessoa.",
                },
              })}
              label="Pessoa"
              error={!!formState.errors.pessoa}
              helperText={formState.errors.pessoa?.message}
              InputProps={{
                ...params.InputProps,
                endAdornment: isFetching ? (
                  <CircularProgress color="inherit" size={20} />
                ) : null,
              }}
            />
          )}
        />

        <TextField
          {...methods.register("telefone", {
            required: "Campo obrigatório.",
            validate: {
              validTelefone: (value) => {
                const isValid = /^\d+$/.test(value) && value.length >= 10;
                return (
                  isValid ||
                  "O telefone deve conter apenas números e ter pelo menos 10 dígitos."
                );
              },
            },
          })}
          label="Telefone"
          className="w-full"
          error={!!formState.errors.telefone}
          helperText={formState.errors.telefone?.message}
        />

        <TextField
          {...methods.register("email", {
            required: "Campo obrigatório.",
            pattern: {
              value: /^\S+@\S+$/,
              message: "Insira um endereço de e-mail válido.",
            },
          })}
          label="E-mail"
          className="w-full"
          error={!!formState.errors.email}
          helperText={formState.errors.email?.message}
        />

        <Button
          type="submit"
          variant="contained"
          color="primary"
          className="w-full bg-blue-500 p-3"
          disabled={formState.isSubmitting}
        >
          Enviar
        </Button>
      </form>
    </FormProvider>
  );
};

export default Form;
