// seed/ejercicios_seed.js
// Comando: node seed/ejercicios_seed.js

import 'dotenv/config';

import { db } from "../config/firebase.js";

const ejercicios = [

  // ─── PECHO (14) ───────────────────────────────────────────────────
  { nombre: "Press Banca Plano", descripcion: "Ejercicio compuesto fundamental para el pecho. Tumbado en banco plano, baja la barra al pecho y empuja hasta extender los brazos.", grupo_muscular: "pecho", nivel_dificultad: "intermedio" },
  { nombre: "Press Banca Inclinado", descripcion: "Variante del press banca con el banco a 30-45 grados. Enfatiza la porción clavicular del pectoral mayor.", grupo_muscular: "pecho", nivel_dificultad: "intermedio" },
  { nombre: "Press Banca Declinado", descripcion: "Banco inclinado hacia abajo. Activa la porción inferior del pecho y reduce la implicación del deltoides anterior.", grupo_muscular: "pecho", nivel_dificultad: "intermedio" },
  { nombre: "Press con Mancuernas Plano", descripcion: "Similar al press banca pero con mancuernas, permitiendo mayor rango de movimiento y trabajo unilateral.", grupo_muscular: "pecho", nivel_dificultad: "principiante" },
  { nombre: "Press con Mancuernas Inclinado", descripcion: "Press con mancuernas en banco inclinado. Mayor activación de la parte superior del pecho.", grupo_muscular: "pecho", nivel_dificultad: "principiante" },
  { nombre: "Aperturas con Mancuernas", descripcion: "Movimiento de aislamiento para el pecho. Brazos ligeramente flexionados, abre y cierra como si abrazaras un árbol.", grupo_muscular: "pecho", nivel_dificultad: "principiante" },
  { nombre: "Fondos en Paralelas", descripcion: "Ejercicio de peso corporal. Baja el cuerpo flexionando los codos y empuja hacia arriba. Inclinarse hacia adelante activa más el pecho.", grupo_muscular: "pecho", nivel_dificultad: "intermedio" },
  { nombre: "Crossover en Polea", descripcion: "Ejercicio de cable que permite tensión constante en el pectoral. Cruza las manos frente al cuerpo.", grupo_muscular: "pecho", nivel_dificultad: "principiante" },
  { nombre: "Flexiones", descripcion: "Ejercicio básico de peso corporal. Manos al ancho de hombros, baja el pecho al suelo y empuja.", grupo_muscular: "pecho", nivel_dificultad: "principiante" },
  { nombre: "Flexiones con Pies Elevados", descripcion: "Variante de flexiones con pies elevados en banco o step. Mayor activación de la parte superior del pecho.", grupo_muscular: "pecho", nivel_dificultad: "intermedio" },
  { nombre: "Press en Máquina Pecho", descripcion: "Variante guiada del press de pecho. Ideal para principiantes o para trabajar al fallo con seguridad.", grupo_muscular: "pecho", nivel_dificultad: "principiante" },
  { nombre: "Aperturas en Polea Alta", descripcion: "Cable desde poleas altas cruzando hacia abajo. Activa la porción inferior y central del pectoral.", grupo_muscular: "pecho", nivel_dificultad: "principiante" },
  { nombre: "Aperturas en Polea Baja", descripcion: "Cable desde poleas bajas cruzando hacia arriba. Activa la porción superior y clavicular del pectoral.", grupo_muscular: "pecho", nivel_dificultad: "principiante" },
  { nombre: "Press con Barra Inclinado Agarre Cerrado", descripcion: "Press inclinado con agarre más estrecho. Combina activación de pecho superior y tríceps.", grupo_muscular: "pecho", nivel_dificultad: "avanzado" },

  // ─── ESPALDA (14) ─────────────────────────────────────────────────
  { nombre: "Dominadas", descripcion: "Rey de los ejercicios de espalda. Agarre prono, sube hasta que la barbilla supere la barra. Activa dorsal, bíceps y romboides.", grupo_muscular: "espalda", nivel_dificultad: "intermedio" },
  { nombre: "Dominadas Supinas", descripcion: "Dominadas con agarre supino (palmas hacia ti). Mayor activación del bíceps y parte baja del dorsal.", grupo_muscular: "espalda", nivel_dificultad: "intermedio" },
  { nombre: "Remo con Barra", descripcion: "Ejercicio compuesto fundamental. Torso inclinado, barra cerca del cuerpo, lleva la barra hacia el abdomen.", grupo_muscular: "espalda", nivel_dificultad: "intermedio" },
  { nombre: "Remo con Mancuerna", descripcion: "Remo unilateral apoyando la rodilla y mano en banco. Excelente para corregir asimetrías.", grupo_muscular: "espalda", nivel_dificultad: "principiante" },
  { nombre: "Jalón al Pecho en Polea", descripcion: "Polea alta con barra. Jala hacia el pecho manteniendo el torso ligeramente inclinado. Alternativa asistida a las dominadas.", grupo_muscular: "espalda", nivel_dificultad: "principiante" },
  { nombre: "Jalón tras Nuca", descripcion: "Variante del jalón llevando la barra tras la cabeza. Activa más los romboides. Requiere movilidad de hombros.", grupo_muscular: "espalda", nivel_dificultad: "avanzado" },
  { nombre: "Remo en Polea Baja", descripcion: "Sentado en máquina de cable, tira del agarre hacia el abdomen manteniendo la espalda recta.", grupo_muscular: "espalda", nivel_dificultad: "principiante" },
  { nombre: "Peso Muerto", descripcion: "Ejercicio compuesto rey. Levanta la barra del suelo hasta la cadera manteniendo la espalda neutra. Trabaja espalda baja, glúteos, isquios.", grupo_muscular: "espalda", nivel_dificultad: "avanzado" },
  { nombre: "Peso Muerto Rumano", descripcion: "Variante del peso muerto con rodillas semiflexionadas. Mayor énfasis en isquiotibiales y espalda baja.", grupo_muscular: "espalda", nivel_dificultad: "intermedio" },
  { nombre: "Hiperextensiones", descripcion: "En banco romano, baja el torso y súbelo hasta quedar alineado. Fortalece erector espinal y glúteos.", grupo_muscular: "espalda", nivel_dificultad: "principiante" },
  { nombre: "Remo en Máquina", descripcion: "Remo guiado en máquina. Permite trabajar con mayor carga de forma segura. Ideal para principiantes.", grupo_muscular: "espalda", nivel_dificultad: "principiante" },
  { nombre: "Pull-Over con Mancuerna", descripcion: "Tumbado en banco, baja la mancuerna por encima de la cabeza con brazos extendidos. Activa dorsal y serrato.", grupo_muscular: "espalda", nivel_dificultad: "principiante" },
  { nombre: "Remo con Agarre Neutro en Polea", descripcion: "Remo en polea baja con agarre en V. Posición más natural para los hombros, gran activación del dorsal.", grupo_muscular: "espalda", nivel_dificultad: "principiante" },
  { nombre: "Face Pull", descripcion: "Polea alta con cuerda, tira hacia la cara separando las manos. Trabaja deltoides posterior y manguito rotador.", grupo_muscular: "espalda", nivel_dificultad: "principiante" },

  // ─── PIERNAS (14) ─────────────────────────────────────────────────
  { nombre: "Sentadilla con Barra", descripcion: "Ejercicio compuesto fundamental. Barra en trapecios, baja hasta que los muslos estén paralelos al suelo.", grupo_muscular: "piernas", nivel_dificultad: "intermedio" },
  { nombre: "Sentadilla Goblet", descripcion: "Sentadilla sosteniendo una mancuerna o kettlebell frente al pecho. Ideal para aprender la técnica.", grupo_muscular: "piernas", nivel_dificultad: "principiante" },
  { nombre: "Sentadilla Búlgara", descripcion: "Pie trasero elevado en banco, baja el cuerpo flexionando la rodilla delantera. Gran activación de cuádriceps y glúteos.", grupo_muscular: "piernas", nivel_dificultad: "intermedio" },
  { nombre: "Prensa de Piernas", descripcion: "Máquina de empuje. Pies en la plataforma, baja el peso flexionando rodillas y empuja.", grupo_muscular: "piernas", nivel_dificultad: "principiante" },
  { nombre: "Extensiones de Cuádriceps", descripcion: "Máquina de extensión. Siéntate y extiende las piernas. Aislamiento puro de cuádriceps.", grupo_muscular: "piernas", nivel_dificultad: "principiante" },
  { nombre: "Curl de Isquiotibiales Tumbado", descripcion: "Máquina de curl. Tumbado boca abajo, flexiona las rodillas hacia los glúteos.", grupo_muscular: "piernas", nivel_dificultad: "principiante" },
  { nombre: "Zancadas con Mancuernas", descripcion: "Paso adelante bajando la rodilla trasera al suelo. Trabaja cuádriceps, glúteos e isquios.", grupo_muscular: "piernas", nivel_dificultad: "principiante" },
  { nombre: "Zancadas Caminando", descripcion: "Variante dinámica de las zancadas avanzando con cada paso. Mayor demanda cardiovascular y coordinación.", grupo_muscular: "piernas", nivel_dificultad: "intermedio" },
  { nombre: "Hip Thrust", descripcion: "Hombros en banco, barra en cadera, empuja hacia arriba. El mejor ejercicio para glúteos.", grupo_muscular: "piernas", nivel_dificultad: "principiante" },
  { nombre: "Sentadilla Hack", descripcion: "Máquina de sentadilla inclinada. Permite mayor rango de movimiento y menor estrés en la espalda.", grupo_muscular: "piernas", nivel_dificultad: "principiante" },
  { nombre: "Step Up con Mancuernas", descripcion: "Sube a un cajón o step con una pierna. Trabaja cuádriceps, glúteos y mejora el equilibrio.", grupo_muscular: "piernas", nivel_dificultad: "principiante" },
  { nombre: "Sentadilla Frontal", descripcion: "Barra apoyada en los deltoides frontales. Mayor activación de cuádriceps y core.", grupo_muscular: "piernas", nivel_dificultad: "avanzado" },
  { nombre: "Good Morning", descripcion: "Barra en trapecios, inclina el torso hacia adelante con rodillas semiflexionadas. Activa isquios y espalda baja.", grupo_muscular: "piernas", nivel_dificultad: "intermedio" },
  { nombre: "Curl de Isquiotibiales de Pie", descripcion: "Máquina unilateral de pie. Flexiona la rodilla llevando el talón hacia el glúteo.", grupo_muscular: "piernas", nivel_dificultad: "principiante" },

  // ─── HOMBROS (10) ─────────────────────────────────────────────────
  { nombre: "Press Militar con Barra", descripcion: "De pie o sentado, empuja la barra desde los hombros hasta encima de la cabeza. Ejercicio compuesto rey de hombros.", grupo_muscular: "hombros", nivel_dificultad: "intermedio" },
  { nombre: "Press con Mancuernas Hombros", descripcion: "Sentado o de pie, empuja las mancuernas desde la altura de los hombros hasta arriba.", grupo_muscular: "hombros", nivel_dificultad: "principiante" },
  { nombre: "Elevaciones Laterales", descripcion: "De pie con mancuernas, sube los brazos lateralmente hasta la altura de los hombros. Aísla el deltoides medio.", grupo_muscular: "hombros", nivel_dificultad: "principiante" },
  { nombre: "Elevaciones Frontales", descripcion: "Mancuernas o disco, sube los brazos al frente hasta la altura de los hombros. Activa el deltoides anterior.", grupo_muscular: "hombros", nivel_dificultad: "principiante" },
  { nombre: "Pájaros con Mancuernas", descripcion: "Inclinado hacia adelante, sube los brazos lateralmente. Trabaja el deltoides posterior y romboides.", grupo_muscular: "hombros", nivel_dificultad: "principiante" },
  { nombre: "Press Arnold", descripcion: "Press con mancuernas con rotación. Empieza con palmas hacia ti y rota durante el empuje. Mayor rango de movimiento.", grupo_muscular: "hombros", nivel_dificultad: "intermedio" },
  { nombre: "Elevaciones Laterales en Polea", descripcion: "Cable desde polea baja para elevaciones laterales. Tensión constante durante todo el movimiento.", grupo_muscular: "hombros", nivel_dificultad: "principiante" },
  { nombre: "Remo al Mentón", descripcion: "Agarre estrecho en barra, sube hasta la barbilla. Trabaja deltoides lateral y trapecio.", grupo_muscular: "hombros", nivel_dificultad: "intermedio" },
  { nombre: "Press en Máquina Hombros", descripcion: "Press guiado en máquina. Permite trabajar con seguridad y buen rango de movimiento.", grupo_muscular: "hombros", nivel_dificultad: "principiante" },
  { nombre: "Encogimientos de Hombros", descripcion: "Con barra o mancuernas, sube los hombros hacia las orejas. Trabaja el trapecio superior.", grupo_muscular: "hombros", nivel_dificultad: "principiante" },

  // ─── BRAZOS (12) ──────────────────────────────────────────────────
  { nombre: "Curl con Barra", descripcion: "De pie, agarre supino en barra, flexiona los codos llevando la barra hacia los hombros. Ejercicio básico de bíceps.", grupo_muscular: "brazos", nivel_dificultad: "principiante" },
  { nombre: "Curl con Mancuernas Alterno", descripcion: "Curl alternando brazos, permite mayor concentración en cada repetición.", grupo_muscular: "brazos", nivel_dificultad: "principiante" },
  { nombre: "Curl Martillo", descripcion: "Agarre neutro (pulgares hacia arriba) en el curl. Activa bíceps braquial y braquiorradial.", grupo_muscular: "brazos", nivel_dificultad: "principiante" },
  { nombre: "Curl Concentrado", descripcion: "Sentado, codo apoyado en el muslo. Movimiento aislado de máxima contracción del bíceps.", grupo_muscular: "brazos", nivel_dificultad: "principiante" },
  { nombre: "Curl en Polea Baja", descripcion: "Cable desde polea baja. Tensión constante en todo el rango. Gran bomba muscular.", grupo_muscular: "brazos", nivel_dificultad: "principiante" },
  { nombre: "Press Francés con Barra Z", descripcion: "Tumbado, baja la barra hacia la frente flexionando los codos. Aislamiento de tríceps.", grupo_muscular: "brazos", nivel_dificultad: "intermedio" },
  { nombre: "Extensión de Tríceps en Polea", descripcion: "De pie con polea alta, extiende los codos hacia abajo. Ejercicio clásico de aislamiento de tríceps.", grupo_muscular: "brazos", nivel_dificultad: "principiante" },
  { nombre: "Press Cerrado con Barra", descripcion: "Press banca con agarre estrecho. Ejercicio compuesto que trabaja principalmente el tríceps.", grupo_muscular: "brazos", nivel_dificultad: "intermedio" },
  { nombre: "Fondos en Banco", descripcion: "Manos en banco detrás del cuerpo, baja flexionando los codos. Trabaja tríceps y pecho inferior.", grupo_muscular: "brazos", nivel_dificultad: "principiante" },
  { nombre: "Patada de Tríceps", descripcion: "Inclinado con mancuerna, extiende el codo hacia atrás. Máxima contracción del tríceps en extensión.", grupo_muscular: "brazos", nivel_dificultad: "principiante" },
  { nombre: "Extensión de Tríceps sobre la Cabeza", descripcion: "Con mancuerna o barra, extiende los brazos sobre la cabeza. Trabaja la cabeza larga del tríceps.", grupo_muscular: "brazos", nivel_dificultad: "principiante" },
  { nombre: "Curl en Banco Scott", descripcion: "Bíceps apoyado en banco inclinado. Elimina el impulso y aísla la porción corta del bíceps.", grupo_muscular: "brazos", nivel_dificultad: "intermedio" },

  // ─── CORE (10) ────────────────────────────────────────────────────
  { nombre: "Plancha Frontal", descripcion: "Apoyado en antebrazos y puntillas, mantén el cuerpo alineado. Trabaja todo el core isométricamente.", grupo_muscular: "core", nivel_dificultad: "principiante" },
  { nombre: "Crunch Abdominal", descripcion: "Tumbado, sube el torso flexionando la columna. Ejercicio básico para el recto abdominal.", grupo_muscular: "core", nivel_dificultad: "principiante" },
  { nombre: "Elevación de Piernas Tumbado", descripcion: "Tumbado, sube las piernas extendidas hasta 90 grados. Trabaja la porción inferior del recto abdominal.", grupo_muscular: "core", nivel_dificultad: "principiante" },
  { nombre: "Rueda Abdominal", descripcion: "Con rueda abdominal, extiéndete hacia adelante desde la posición de rodillas. Ejercicio muy completo de core.", grupo_muscular: "core", nivel_dificultad: "avanzado" },
  { nombre: "Russian Twist", descripcion: "Sentado con torso inclinado, rota el tronco de lado a lado. Trabaja oblicuos.", grupo_muscular: "core", nivel_dificultad: "principiante" },
  { nombre: "Plancha Lateral", descripcion: "Apoyado en un antebrazo y el lateral del pie. Trabaja oblicuos y cuadrado lumbar.", grupo_muscular: "core", nivel_dificultad: "principiante" },
  { nombre: "Mountain Climbers", descripcion: "En posición de plancha, alterna llevando rodillas al pecho rápidamente. Trabajo de core y cardio.", grupo_muscular: "core", nivel_dificultad: "principiante" },
  { nombre: "Crunches en Polea", descripcion: "De rodillas con cuerda en polea alta, flexiona el torso hacia abajo. Mayor resistencia que los crunches normales.", grupo_muscular: "core", nivel_dificultad: "intermedio" },
  { nombre: "Hollow Body Hold", descripcion: "Tumbado, eleva ligeramente piernas y hombros del suelo manteniendo la zona lumbar pegada. Ejercicio de tensión abdominal.", grupo_muscular: "core", nivel_dificultad: "intermedio" },
  { nombre: "Dragon Flag", descripcion: "Apoyado en banco, sube y baja el cuerpo extendido controlando con el core. Ejercicio avanzado.", grupo_muscular: "core", nivel_dificultad: "avanzado" },

  // ─── GLÚTEOS (8) ──────────────────────────────────────────────────
  { nombre: "Hip Thrust con Barra", descripcion: "Hombros en banco, barra en cadera, empuja la cadera hacia arriba. El ejercicio más efectivo para glúteos.", grupo_muscular: "gluteos", nivel_dificultad: "intermedio" },
  { nombre: "Patada de Glúteo en Polea", descripcion: "De pie con polea en tobillo, extiende la pierna hacia atrás. Aislamiento directo del glúteo mayor.", grupo_muscular: "gluteos", nivel_dificultad: "principiante" },
  { nombre: "Sentadilla Sumo", descripcion: "Sentadilla con pies muy abiertos y puntas hacia afuera. Mayor activación de glúteos e isquios.", grupo_muscular: "gluteos", nivel_dificultad: "principiante" },
  { nombre: "Abducción de Cadera en Máquina", descripcion: "Sentado en máquina, separa las piernas contra resistencia. Trabaja glúteo medio y menor.", grupo_muscular: "gluteos", nivel_dificultad: "principiante" },
  { nombre: "Puente de Glúteos", descripcion: "Tumbado, eleva la cadera hacia arriba apretando los glúteos. Versión sin barra del hip thrust.", grupo_muscular: "gluteos", nivel_dificultad: "principiante" },
  { nombre: "Zancada Lateral", descripcion: "Paso lateral con una pierna flexionada y la otra extendida. Trabaja glúteos, aductores y cuádriceps.", grupo_muscular: "gluteos", nivel_dificultad: "principiante" },
  { nombre: "Romanian Deadlift con Mancuernas", descripcion: "Peso muerto rumano con mancuernas. Excelente para glúteos e isquiotibiales.", grupo_muscular: "gluteos", nivel_dificultad: "principiante" },
  { nombre: "Kickback en Banco", descripcion: "A cuatro patas en banco, extiende la pierna hacia atrás y arriba. Aislamiento de glúteo mayor.", grupo_muscular: "gluteos", nivel_dificultad: "principiante" },

  // ─── CARDIO (6) ───────────────────────────────────────────────────
  { nombre: "Burpees", descripcion: "Desde de pie, baja al suelo, haz una flexión, salta hacia arriba. Ejercicio completo de alta intensidad.", grupo_muscular: "cardio", nivel_dificultad: "intermedio" },
  { nombre: "Saltos a la Comba", descripcion: "Saltar a la comba a ritmo constante. Excelente cardio de bajo impacto articular.", grupo_muscular: "cardio", nivel_dificultad: "principiante" },
  { nombre: "Box Jumps", descripcion: "Salta sobre un cajón pliométrico y baja controladamente. Potencia explosiva y cardio.", grupo_muscular: "cardio", nivel_dificultad: "intermedio" },
  { nombre: "Remo en Máquina", descripcion: "Máquina de remo ergómetro. Cardio de cuerpo completo con bajo impacto articular.", grupo_muscular: "cardio", nivel_dificultad: "principiante" },
  { nombre: "Bicicleta Estática HIIT", descripcion: "Sprints en bicicleta estática alternando alta y baja intensidad. Quema de grasa eficiente.", grupo_muscular: "cardio", nivel_dificultad: "principiante" },
  { nombre: "Battle Ropes", descripcion: "Ondas con cuerdas pesadas. Trabaja hombros, core y sistema cardiovascular simultáneamente.", grupo_muscular: "cardio", nivel_dificultad: "intermedio" },

  // ─── GEMELOS (4) ──────────────────────────────────────────────────
  { nombre: "Elevaciones de Talones de Pie", descripcion: "De pie, sube sobre las puntas de los pies. Ejercicio básico para el gemelo (gastrocnemio).", grupo_muscular: "gemelos", nivel_dificultad: "principiante" },
  { nombre: "Elevaciones de Talones Sentado", descripcion: "Sentado en máquina, sube los talones. Activa principalmente el sóleo.", grupo_muscular: "gemelos", nivel_dificultad: "principiante" },
  { nombre: "Elevaciones en Prensa", descripcion: "En prensa de piernas, empuja solo con los dedos del pie. Permite gran carga en gemelos.", grupo_muscular: "gemelos", nivel_dificultad: "principiante" },
  { nombre: "Donkey Calf Raise", descripcion: "Inclinado hacia adelante con peso en la cadera, sube sobre las puntas. Variante avanzada de gemelos.", grupo_muscular: "gemelos", nivel_dificultad: "avanzado" },

  // ─── EXTRA para completar 100 ─────────────────────────────────────
  { nombre: "Curl de Bíceps en Polea Alta", descripcion: "Cable desde polea alta, flexiona el codo llevando la mano hacia la cabeza. Activa la cabeza larga del bíceps.", grupo_muscular: "brazos", nivel_dificultad: "principiante" },
  { nombre: "Press Inclinado con Mancuernas Agarre Neutro", descripcion: "Press inclinado con palmas enfrentadas. Menor estrés en el hombro y buena activación del pecho superior.", grupo_muscular: "pecho", nivel_dificultad: "principiante" },
  { nombre: "Sentadilla Pistola", descripcion: "Sentadilla con una sola pierna completamente extendida. Ejercicio avanzado de fuerza y equilibrio.", grupo_muscular: "piernas", nivel_dificultad: "avanzado" },
  { nombre: "Remo con Barra en T", descripcion: "Barra fijada en un extremo, tira del otro extremo hacia el pecho. Gran ejercicio para el grosor de espalda.", grupo_muscular: "espalda", nivel_dificultad: "intermedio" },
  { nombre: "Press Landmine", descripcion: "Barra fijada en el suelo, empuja el extremo libre hacia arriba. Activa pecho, hombros y core.", grupo_muscular: "hombros", nivel_dificultad: "intermedio" },
  { nombre: "Ab Wheel de Rodillas", descripcion: "Con rueda abdominal desde rodillas, extiéndete hacia adelante controlando con el core.", grupo_muscular: "core", nivel_dificultad: "intermedio" },
  { nombre: "Glute Ham Raise", descripcion: "En máquina GHR, baja el torso controladamente y sube usando isquios y glúteos.", grupo_muscular: "gluteos", nivel_dificultad: "avanzado" },
  { nombre: "Sprint en Cinta", descripcion: "Sprints de alta intensidad en cinta de correr. Potente quemador de calorías y mejora cardiovascular.", grupo_muscular: "cardio", nivel_dificultad: "intermedio" },

];

// Función principal de seed
const seedEjercicios = async () => {
  console.log(`Iniciando seed de ${ejercicios.length} ejercicios...`);

  const batch = db.batch();
  const colRef = db.collection("ejercicios_globales");

  for (const ejercicio of ejercicios) {
    const docRef = colRef.doc();
    batch.set(docRef, ejercicio);
  }

  await batch.commit();
  console.log(` ${ejercicios.length} ejercicios insertados correctamente.`);
  process.exit(0);
};

seedEjercicios().catch((err) => {
  console.error(" Error en el seed:", err);
  process.exit(1);
});