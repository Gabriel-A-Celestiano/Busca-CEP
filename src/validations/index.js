export function valideCep(n) {
  var cepValid = /^[0-9]{5}-[0-9]{3}$/;
  return cepValid.test(n);
}
