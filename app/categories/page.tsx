"use client";
import React from "react";
import GridCategories from "@/components/search/GridCategories";
import { getAllCategories } from "@/helper/Categories";

const Categories = () => {
  const categories = getAllCategories(); // Asegúrate de que devuelva { name, icon }

  return <GridCategories categories={categories} />;
};

export default Categories;
