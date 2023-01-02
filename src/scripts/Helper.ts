export class Color {
  public static readonly BK = new Color(-1, 0, 1, -1, 'Schwarz', '#000000');
  public static readonly BN = new Color(1, 1, 10, 0.01, 'Braun', '');
  public static readonly RD = new Color(2, 2, 100, 0.02, 'Rot', '#ff0000');
  public static readonly OG = new Color(3, 3, 1000, -1, 'Orange', '#ff0000');
  public static readonly YE = new Color(4, 4, 10000, -1, 'Gelb', '#ff0000');
  public static readonly GN = new Color(5, 5, 100000, 0.005, 'Grün', '#ff0000');
  public static readonly BU = new Color(
    6,
    6,
    1000000,
    0.0025,
    'Blau',
    '#ff0000',
  );
  public static readonly VT = new Color(
    7,
    7,
    10000000,
    0.001,
    'Violett',
    '#ff0000',
  );
  public static readonly GY = new Color(8, 8, 100000000, -1, 'Grau', '#ff0000');
  public static readonly WH = new Color(
    9,
    9,
    1000000000,
    -1,
    'Weiß',
    '#ffffff',
  );
  public static readonly GD = new Color(-1, -1, 0.1, 0.05, 'Gold', '#ffffff');
  public static readonly SR = new Color(-1, -1, 0.01, 0.1, 'Silber', '#ffffff');
  public static readonly NN = new Color(
    -1,
    -1,
    -1,
    0.2,
    'Ohne Farbe',
    'transparent',
  );

  constructor(
    public firstRing: number,
    public secondRing: number,
    public thirdRing: number,
    public fourthRing: number,
    public name: string,
    public colorCode: string,
  ) {}
}

export function calcEReihe(num: number): Array<string> {
  const list = ['1.0'];
  const k = Math.pow(10, 1 / num);
  for (let i: number = 1; i < num; i++) {
    list.push(Math.pow(k, i).toFixed(2));
  }

  return list;
}

function findWithTolerance(eReihe: EReihe, number: number) {
  return (eReihe.value.find((num) => {
    const tolerance = eReihe.tolerance;
    let n = +num;
    if (n === number) {
      return true;
    }

    return (n - n * tolerance <= number) && (n + n * tolerance >= number);
  }));
}

export class EReihe {
  public static readonly E_6 = new EReihe('E 6', 0.2, calcEReihe(6));
  public static readonly E_12 = new EReihe('E 12', 0.1, calcEReihe(12));
  public static readonly E_24 = new EReihe('E 24', 0.05, calcEReihe(24));
  public static readonly E_48 = new EReihe('E 48', 0.02, calcEReihe(48));
  public static readonly E_96 = new EReihe('E 96', 0.01, calcEReihe(96));

  constructor(
    public name: string,
    public tolerance: number,
    public value: Array<string>
  ) {}
  
  public static partOf(resistance: number): Array<string> {
    const list = []
    if (findWithTolerance(this.E_6, resistance)) {
      list.push('E 6');
    }
    if (findWithTolerance(this.E_12, resistance)) {
      list.push('E 12');
    }
    if (findWithTolerance(this.E_24, resistance)) {
      list.push('E 24');
    }
    if (findWithTolerance(this.E_48, resistance)) {
      list.push('E 48');
    }
    if (findWithTolerance(this.E_96, resistance)) {
      list.push('E 96');
    }

    return list;
  }
}
