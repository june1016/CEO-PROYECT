"use client";
import React from "react";
import OpeningInformationTabs from "@/components/openingInformation/OpeningInformationTabs";
import { motion } from "framer-motion";

const OpeningInformationPage: React.FC = () => {
  return (
    <motion.div
      className="p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <OpeningInformationTabs />
    </motion.div>
  );
};

export default OpeningInformationPage;
