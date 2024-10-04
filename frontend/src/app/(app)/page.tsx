"use client";

import type { NextPage } from "next";
import { Content } from "@/components/home/content";
import useAuth from "@/hooks/useAuth";

const Home: NextPage = () => {
  useAuth(); // Usamos el hook para verificar autenticación

  return <Content />;
};

export default Home;
