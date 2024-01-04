'use client'
import { delay, motion, Variants } from "framer-motion";


import MaxWidthWrapper from '../MaxWidthWrapper'
import CardRecipe from '../CardRecipe'
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { fetchTopRecipes } from "@/lib/data";
import { Recipe } from "@prisma/client";


const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1, transition: {
            duration: 1.5, staggerChildren: 0.2, y: {
                delayChildren: 0.5,
            }
        }
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 100 },
    visible: { opacity: 1, y: 0 },
};


export default function TopRecipes({ recipes }: { recipes: any[] }) {
    return (
        <section className='py-20' >
            <MaxWidthWrapper className="max-w-screen-lg px-8">
                <div className='mb-8'>
                    <h1 className='text-2xl font-bold text-center'>Principais Receitas</h1>

                </div>
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className='flex flex-col justify-between sm:flex-row gap-10'>
                    <motion.div variants={itemVariants}>
                        {recipes.map((recipe) => (
                            <CardRecipe key={recipe.id} recipe={recipe} />
                        ))}
                    </motion.div>


                </motion.div>
                <motion.div
                    variants={itemVariants}
                    className='flex justify-center mt-12'>
                    <Button asChild>
                        <Link href='/receitas'>
                            Ver Todas
                        </Link>
                    </Button>
                </motion.div>

            </MaxWidthWrapper>
        </section>
    )
}
