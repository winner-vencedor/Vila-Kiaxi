export default function PersonalDetails() {
  const player =true;

  const inforPlayer = [
    {
      id: '212',
      Position: 'Goalkeeper',
      foot: 'Right',
      number: '8',
    },
  ];

  return (
    <div className="  space-y-6  p-2">
      <div className="flex flex-col gap-6">
        <h1 className="font-mono text-xl text-gray-950">Personal Details</h1>
        <div>
          <div className="lg:grid lg:grid-cols-2 lg:gap-3 flex flex-col gap-3 justify-center">
            <div className="flex flex-col gap-1 ">
              <p className="text-gray-500">Nome</p>
              <div className="border rounded-sm border-gray-600 p-1">
                <span>João Cláudio Nsingi</span>
              </div>
            </div>
            <div className="flex flex-col gap-1 p-1">
              <h4 className="text-gray-500">Email</h4>
              <div className=" border rounded-sm  border-gray-600 p-1 ">
                <span>JoãoCláudioNsingi@gmail.com</span>
              </div>
            </div>
            <div className="flex flex-col gap-1 ">
              <h4 className="text-gray-500">Telefone</h4>
              <div className=" border rounded-sm border-gray-600 p-1">
                <span>952085664</span>
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <h4 className="text-gray-500">genero</h4>
              <div className="border rounded-sm border-gray-600  p-1">
                <span>Masculino</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        {(player && (
          <div>
            {inforPlayer.map((item) => {
              return (
                <div  className="flex flex-col gap-6" key={item.id}>
                  <div>
                    <h1 className="font-mono text-xl text-gray-950">
                      Player Details
                    </h1>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="flex flex-col gap-1 ">
                      <p className="text-gray-500">Position</p>
                      <div className="border rounded-sm border-gray-600 p-1">
                        <span>{item.Position}</span>
                      </div>
                    </div>
                    <div className="flex flex-col gap-1 p-1">
                      <h4 className="text-gray-500">PreferredFoot</h4>
                      <div className=" border rounded-sm  border-gray-600 p-1 ">
                        <span>{item.foot}</span>
                      </div>
                    </div>

                  </div>
                </div>
              );
            })}
          </div>
        )) || (
          <div className="space-y-6">
            <div className="flex flex-col gap-6">
              <h1 className="font-mono text-xl text-gray-950">
                Player Details
              </h1>
            </div>
            <div className="flex flex-col items-center gap-2">
              <h1>Informações não encontradas</h1>
              <h3>Ainda não es um Jogador</h3>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
