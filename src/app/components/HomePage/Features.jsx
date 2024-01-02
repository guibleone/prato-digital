'use client'
import { motion } from 'framer-motion';
import { Album, CookingPot, Globe } from 'lucide-react';
import MaxWidthWrapper from '../MaxWidthWrapper';

const sectionVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.5, staggerChildren: 0.2 } },
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.2 } },
};


export default function Features() {
    return (
        <MaxWidthWrapper>
            <motion.div
                className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10"
                variants={sectionVariants}
                initial="hidden"
                animate="visible"
            >
                <motion.div
                    className="flex flex-col items-center text-center gap-4"
                    variants={itemVariants}
                >
                    <CookingPot size={40} />
                    <h2 className="text-lg font-bold tracking-tight">
                        Explore Sabores
                    </h2>
                    <p className="text-sm text-muted-foreground">
                        Descubra pratos deliciosos e explore novos sabores, desde receitas tradicionais até inovações culinárias.
                    </p>
                </motion.div>

                <motion.div
                    className="flex flex-col items-center text-center gap-4"
                    variants={itemVariants}
                >
                    <Globe size={40} />
                    <h2 className="text-lg font-bold tracking-tight">
                        Cozinha Conectada
                    </h2>
                    <p className="text-sm text-muted-foreground">
                        Nosso aplicativo é o ponto de encontro perfeito para a comunidade culinária online.
                    </p>
                </motion.div>

                <motion.div
                    className="flex flex-col items-center text-center gap-4"
                    variants={itemVariants}
                >
                    <Album size={40} />
                    <h2 className="text-lg font-bold tracking-tight">
                        Planeje, Cozinhe, Compartilhe
                    </h2>
                    <p className="text-sm text-muted-foreground">
                        Encontre ingredientes facilmente e siga instruções passo a passo para preparar pratos deliciosos.
                    </p>
                </motion.div>
            </motion.div>
        </MaxWidthWrapper>
    )
}
