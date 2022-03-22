export const inschrijven = async (command, user) => {
  const [ type, action, actionId ] = command.split('_', 3);
  if (!type || !action || !actionId) {
    return { error: "Verwerking mislukt (1)" };
  }
  if (
    type !== 'inschrijving' ||
    (action !== 'herkansen' && action !== 'inhalen' && action !== 'verwijderen')
  ) {
    return { error: "Verwerking mislukt (2)" };	
  }
  const id = parseInt(actionId);
  if (!id) {
    return { error: "Verwerking mislukt (3)" };
  }
  if (action === 'herkansen' || action === 'inhalen') {
    await prisma.inschrijving.create({
      data: {
        gebruikerId: user.id,
        toetsId: id,
        type: action.slice(0, 1).toUpperCase(),
        inschrijverId: user.id,
      }
    });
  } else {
    await prisma.inschrijving.delete({
      where: {
        id
      }
    });
  }
};
