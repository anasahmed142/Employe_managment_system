"use client"

import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAppSelector } from "@/store";
import { toast } from "sonner";
import { addEmployee } from "@/services/adminservice";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  salery: z.string().min(1, "Invalid salery"),
});

type FormValues = z.infer<typeof formSchema>;

const AddEmployeePage = () => {
  const [loading, setLoading] = useState(false);
  const user = useAppSelector((state) => state.auth.user);

  const { register, handleSubmit, formState: { errors } } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    if (user && user.role === "admin") {
      setLoading(true);
      try {
        await addEmployee({ ...data, adminEmail: user.email });
        toast.success("Employee added successfully!");
      } catch (error) {
        toast.error("Failed to add employee."+error);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Add New Employee</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <Input placeholder="Name" {...register("name")} />
          {errors.name && <p className="text-red-500">{errors.name.message}</p>}
        </div>
        <div>
          <Input placeholder="Email" {...register("email")} />
          {errors.email && <p className="text-red-500">{errors.email.message}</p>}
        </div>
        <div>
          <Input placeholder="Per Day Salery" {...register("salery")} />
          {errors.salery && <p className="text-red-500">{errors.salery.message}</p>}
        </div>
        <Button type="submit" disabled={loading}>
          {loading ? "Adding..." : "Add Employee"}
        </Button>
      </form>
    </div>
  );
};

export default AddEmployeePage;
