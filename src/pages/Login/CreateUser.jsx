import React, { useContext, useState } from 'react'
import { AppContextAPI } from '../../context/AppContext';

export default function CreateUser() {
    const { createUser } = useContext(AppContextAPI);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        const result = await createUser({ name, email, password, role });
        if (result.success) {
            alert("User created successfully!");
            setName("");
            setEmail("");
            setPassword("");
            setRole("");
        } else {
            alert("Error creating user: " + result.error);
        }
    };
  return (
    <div>
      <div className="w-full max-w-sm bg-neutral-primary-soft p-6 border border-default rounded-base shadow-xs">
        <form>
          <h5 className="text-xl font-semibold text-heading mb-6">
            Create user and assign roles{" "}
          </h5>
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block mb-2.5 text-sm font-medium text-heading"
            >
              User Name
            </label>
            <input
              type="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              id="name"
              className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body"
              placeholder="Enter name"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block mb-2.5 text-sm font-medium text-heading"
            >
              User email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body"
              placeholder="Enter email"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block mb-2.5 text-sm font-medium text-heading"
            >
              Create password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body"
              placeholder="Enter Password"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="role"
              className="block mb-2.5 text-sm font-medium text-heading"
            >
              User role
            </label>
            <select
              id="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body"
            >
              <option value="">Select role</option>
              <option value="admin">Admin</option>
              <option value="admission officer">Admission Officer</option>
              <option value="management">Management</option>
            </select>
          </div>
          <button
            type="submit"
            onClick={handleSubmit}
            className="text-white bg-brand box-border border border-transparent hover:bg-brand-strong focus:ring-4 focus:ring-brand-medium shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2.5 focus:outline-none w-full mb-3"
          >
            Create user
          </button>
        </form>
      </div>
    </div>
  );
}
