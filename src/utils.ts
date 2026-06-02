/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export const formatPrice = (value: number): string => {
  return `$${Math.round(value).toLocaleString('es-CO')}`;
};
