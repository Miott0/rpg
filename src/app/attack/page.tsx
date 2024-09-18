"use client"

import { useState } from "react";
import { random } from "lodash"; // Importamos o lodash para usar rolagem de dados
import { calculateDamagePercentage } from '../../utils/damageCalculator'; // Importamos a função utilitária

export default function Attack() {
  const [hitRoll, setHitRoll] = useState<number | null>(null);
  const [hitArea, setHitArea] = useState<string | null>(null);
  const [legArea, setLegArea] = useState<string | null>(null);
  const [modifier, setModifier] = useState<number>(0); // Estado para o bônus ou penalidade
  const [damageDie, setDamageDie] = useState<number>(6); // Tipo de dado para dano
  const [damageRoll, setDamageRoll] = useState<number>(0); // Valor do dado rolado para dano
  const [damageModifier, setDamageModifier] = useState<number>(0); // Modificador de dano
  const [damagePercentage, setDamagePercentage] = useState<number | null>(null); // Porcentagem de dano

  // Função para rolar o d20 (rolagem de acerto)
  const rollD20 = (): void => {
    const roll = random(1, 20); // Usamos lodash para rolar entre 1 e 20
    const result = roll + modifier; // Aplicar o bônus ou penalidade
    setHitRoll(result);
  };

  // Função para rolar o d6 e determinar a área acertada
  const rollD6 = (): void => {
    const roll = random(1, 6); // Usamos lodash para rolar entre 1 e 6
    determineHitArea(roll);
  };

  // Determinar a área acertada com base na rolagem do d6
  const determineHitArea = (roll: number): void => {
    const hitAreas: { [key: number]: string } = {
      1: "Cabeça",
      2: "Tronco",
      3: "Tronco",
      4: "Braço direito",
      5: "Braço esquerdo",
      6: "Pernas"
    };

    const area = hitAreas[roll] || "Indeterminado";
    setHitArea(area);

    if (roll === 6) {
      // Se a rolagem for 6 (Pernas), rolamos para determinar a perna
      const legRoll = random(1, 6);
      const leg = legRoll <= 3 ? "Perna direita" : "Perna esquerda";
      setLegArea(leg);
    } else {
      setLegArea(null);
    }
  };

  // Função para rolar o dado de dano e calcular a porcentagem
  const handleDamageCalculation = (): void => {
    const roll = random(1, damageDie); // Rolar o dado de dano
    setDamageRoll(roll); // Atualizar o valor do dado rolado para dano
    const percentage = calculateDamagePercentage(damageDie, roll, damageModifier);
    setDamagePercentage(percentage);
  };

  const handleClear = (): void => {
    setHitRoll(null);
    setHitArea(null);
    setLegArea(null);
    setModifier(0);
    setDamageDie(6);
    setDamageRoll(0);
    setDamageModifier(0);
    setDamagePercentage(null);
  };

  return (
    <div className="p-8 min-h-screen">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-3xl font-bold">Calculadora de Ataque RPG</h1>
        <button 
          onClick={handleClear} 
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
        >
          Clear
        </button>
      </div>

      {/* Input para bônus ou penalidade */}
      <div className="mb-4">
        <label className="block text-lg font-semibold mb-2" htmlFor="modifier">
          Bônus/penalidade (d20):
        </label>
        <input
          id="modifier"
          type="number"
          value={modifier}
          onChange={(e) => setModifier(parseInt(e.target.value, 10))}
          className="border border-gray-300 text-black p-2 rounded w-24"
          placeholder="0"
        />
      </div>

      {/* Botão para rolar o d20 */}
      <button
        onClick={rollD20}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Rolagem de Acerto (d20)
      </button>

      {/* Mostrar o resultado da rolagem d20 */}
      {hitRoll !== null && (
        <div className="mt-4">
          <h3 className="text-xl">
            Rolagem de Acerto (d20): {hitRoll} | {hitRoll - modifier} + {modifier}
          </h3>

          {/* Botão para rolar a área de dano (visível apenas após a rolagem d20) */}
          <button
            onClick={rollD6}
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-4"
          >
            Rolagem de Área de Acerto (d6)
          </button>
        </div>
      )}

      {/* Mostrar a área acertada */}
      {hitArea && (
        <div className="mt-4">
          <h3 className="text-xl">Área Acertada: {hitArea}</h3>
          {hitArea === "Pernas" && legArea && (
            <h3 className="text-xl">Parte Específica: {legArea}</h3>
          )}
        </div>
      )}

      {hitArea !== null && (
        <div>
          {/*Input para selecionar o tipo de dado para dano*/}
          <div className="mb-4">
            <label className="block text-lg font-semibold mb-2" htmlFor="damageDie">
              Tipo de dado para dano:
            </label>
            <select
              id="damageDie"
              value={damageDie}
              onChange={(e) => setDamageDie(parseInt(e.target.value, 10))}
              className="border border-gray-300 text-black p-2 rounded w-32"
            >
              <option value={6}>d6</option>
              <option value={8}>d8</option>
              <option value={10}>d10</option>
            </select>
          </div>

          {/* Input para valor do modificador de dano */}
          <div className="mb-4">
            <label className="block text-lg font-semibold mb-2" htmlFor="damageModifier">
              Modificador de dano:
            </label>
            <input
              id="damageModifier"
              type="number"
              value={damageModifier}
              onChange={(e) => setDamageModifier(parseInt(e.target.value, 10))}
              className="border border-gray-300 p-2 text-black rounded w-24"
              placeholder="0"
            />
          </div>
          {/* Botão para rolar o dado de dano e calcular a porcentagem */}
          <button
            onClick={handleDamageCalculation}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-4"
          >
            Calcular Porcentagem de Dano
          </button>
        </div>
      )}

      {/*Mostrar o resultado do dado rolado para dano e a porcentagem de dano */}
      {damageRoll !== null && (
        <div className="mt-4">
          <h3 className="text-xl">Dado de Dano Rolado: {damageRoll}
            {damageModifier !== 0 && (
              ` + (${damageModifier})`
            )}
          </h3>
          {damagePercentage !== null && (
            <h3 className="text-xl">Porcentagem de Dano: {damagePercentage.toFixed(0)}%</h3>
          )}
        </div>
      )}
    </div>
  );
}
