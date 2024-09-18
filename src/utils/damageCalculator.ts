import { mapValues } from 'lodash';

interface DamageMapping {
  [key: number]: number; // Mapeia o tipo de dado para a porcentagem por ponto de dano
}

// Mapeamento de porcentagens de dano por tipo de dado
const damageMappings: DamageMapping = {
  6: 16.67,
  8: 12.5,
  10: 10,
};

// Função para calcular a porcentagem de dano
export function calculateDamagePercentage(damageDie: number, damageRoll: number, modifier: number): number {
  const percentagePerPoint = damageMappings[damageDie] || 0;
  const totalDamage = damageRoll + modifier;
  return totalDamage * percentagePerPoint;
}
