import { useForm } from "react-hook-form";
import { ChevronRight } from "lucide-react";

import {
    Form,
    FormField,
    FormItem,
    FormLabel,
    FormControl,
    FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

type FormValues = {
    email: string;
    password: string;
};

interface LoginFormProps {
    handleLogin: () => void;
}

export default function LoginForm({ handleLogin }: LoginFormProps) {
    const methods = useForm<FormValues>({
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const onSubmit = (data: FormValues) => {
        console.log("Form submitted", data);
    };

    return (
        <Form {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit)} className="mx-auto max-w-md p-6">
                <div className="mb-6">
                    <h3 className="text-left text-2xl font-semibold text-gray-800">Sign in</h3>
                </div>

                <FormField
                    control={methods.control}
                    name="email"
                    rules={{
                        required: "Email is required",
                        pattern: {
                            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                            message: "Please enter a valid email address",
                        },
                    }}
                    render={({ field }) => (
                        <FormItem className="mb-4">
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="Email Address"
                                    autoCapitalize="off"
                                    autoCorrect="off"
                                    {...field}
                                    type="email"
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={methods.control}
                    name="password"
                    rules={{ required: "Password is required" }}
                    render={({ field }) => (
                        <FormItem className="mb-6">
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                                <Input placeholder="Password" {...field} type="password" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <div className="flex justify-start">
                    <Button type="submit" className="px-4" variant="default" onClick={handleLogin}>
                        Next
                        <ChevronRight className="size-4" />
                    </Button>
                </div>
            </form>
        </Form>
    );
}
