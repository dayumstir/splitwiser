"use client";

import { useState } from "react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";

export default function AddExpense() {
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [paidBy, setPaidBy] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log({ amount, description, paidBy });
  };

  return (
    <div className="space-y-4 p-4">
      <h1 className="text-2xl font-bold">Add Expense</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="amount">Amount</Label>
          <Input
            id="amount"
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter amount"
            required
          />
        </div>
        <div>
          <Label htmlFor="description">Description</Label>
          <Input
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter description"
            required
          />
        </div>
        <div>
          <Label htmlFor="paidBy">Paid By</Label>
          <Select onValueChange={setPaidBy} required>
            <SelectTrigger>
              <SelectValue placeholder="Select who paid" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="you">You</SelectItem>
              <SelectItem value="john">John</SelectItem>
              <SelectItem value="sarah">Sarah</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button type="submit" className="w-full">
          Add Expense
        </Button>
      </form>
    </div>
  );
}
