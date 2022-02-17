(function ($) {
  let folder = 76728;
  let limit = 2000;
  let page = 1;
  let total_page = 1;
  let total_count = 0;

  const banned_headers = [
    "bitcoin",
    "btc",
    "BTC",
    "crypto",
    "kryptowaluty",
    "kruptowaluta",
    "kasyno",
    "duże zyski",
    "zysk",
    "kapitalizacja walut",
    "newsletter",
    "dział Promocji AZ.pl",
    "coin",
    "CRYPTO",
    "COIN",
    "gratulacje",
    "wygrać",
    "julia",
    "scarlett",
    "elżbieta",
    "wiesława",
    "stanisława",
    "czesława",
    "bożena",
    "alina",
    "ann",
    "anna",
    "miejsceflirt",
    "lisa",
    "lara",
    "jessie",
    "joy",
    "Popularne w Twoich kręgach",
    "monika",
    "mirosław",
    "oletyna",
    "klaudia",
    "rozalia",
    "dominika",
    "investing",
    "offer",
    "exclusive",
    "vanessa",
    "elena",
    "ela",
    "pinterest",
    "specjalnyalert",
    "opportunity",
    "earnings",
    "earn",
    "info-",
    "o2@",
    "wp@",
    "onet@",
    "ad@",
    "offtheshelf@",
    "л",
    "и",
    "ь",
    "Д",
    "я",
    "ч",
    "kf27@",
    "cropp",
    "play",
    "orange",
    "samsung",
  ];

  const banned_snippets = [
    "zdjęcia",
    "profil",
    "podobasz",
    "zarobić",
    "Najgoretsze dziewczyny i samotne kobiety",
    "Najgoretsze",
    "dziewczyny",
    "samotne kobiety",
    "okazje z wyprzedaży kolekcji",
    "okazje",
    "wyprzedaży",
    "wyprzedaż",
    "kolekcji",
    "użytkownicy",
    "szukają",
    "z powrotem",
    "opinia",
    "opinią",
    "opinie",
    "co myślisz",
    "ropp",
    "Wypróbuj jeszcze raz dowolną aplikację",
    "wypróbuj",
    "Wypróbuj",
    "Aplikację",
    "aplikację",
    "subscription",
  ];

  const banned_domains = [
    "brief.com",
    "prezenty.pl",
    "popsa.com",
    "schuster.com",
    "upmailling.com",
    "danae.com.pl",
    "ness.com",
    "chol.com",
    "italy.com",
    "biggie.com",
    ".org.uk",
    ".co.uk",
    ".tr",
    "tomchalky.com",
    "co.jp",
    ".co.pl",
    "cfo-forum.org",
    ".nl",
    "spelnienie-marzen.pl",
    "new-dobre-okazje.pl",
    ".com.o2.pl",
    "kapitalnezakupy.pl",
    "conowegowofertach.pl",
    "naszabaza.com.pl",
    ".css.ch",
    ".chegg.com",
    "mediaexpert.pl",
    "mail.instagram",
    "ceneo.pl",
    ".fr",
    "unbeatablemind.com",
    ".io",
    ".com.au",
    ".no",
    "lindex.com",
    ".ru",
    ".xyz",
    ".net",
    "contact@ustfujairah.com",
    "support@cloudwith.me",
    "notice@amazon.com",
    "outlook.com",
    "abc-trading.com",
    "info.o2.pl",
    "wizaz.pl",
    "no-replay@az.pl",
    "info@az.pl",
    "mailowehistorie.pl",
    "ashampoo.com",
    "szalowepromocje.pl",
    "zawrotnepromocje.pl",
    "komputronik.shop",
    "activity@notifications.pinterest.com",
    "tut.com",
    "info@twitter",
    "magicznebazy.pl",
  ];

  const flags = ["UnSubHeader"];
  const extra_flags = ["SPFsoftfail"];

  let banned_list = [];

  const capitalizeFirstLetter = (
    [first, ...rest],
    locale = navigator.language
  ) => first.toLocaleUpperCase(locale) + rest.join("");

  const on_response = async res => {
    //console.log(res);
    //console.log(res.mails[0].from.match(/<(.*)>/i)[0]);
    let found_list = [];

    for (let i = 0; i < res.mails.length; i++) {
      let item = res.mails[i];

      found_list.push(item.mid);

      //   let header = item.from.replace(/<(.*)>/i, "");
      //   let domain = item.from.match(/<(.*)>/i)[0];

      //   for (const [, header] of banned_headers.entries()) {
      //     let find_with_normal_letter =
      //       item.from.indexOf(header) >= 0 ? true : false;
      //     let find_with_capitalize_letter =
      //       item.from.indexOf(capitalizeFirstLetter(header)) >= 0 ? true : false;

      //     if (find_with_normal_letter || find_with_capitalize_letter) {
      //       found_list.push(item.mid);
      //       continue;
      //     }
      //   }

      //   for (const [, domain] of banned_domains.entries()) {
      //     let found = item.from.indexOf(domain) >= 0 ? true : false;

      //     if (found) {
      //       found_list.push(item.mid);
      //       continue;
      //     }
      //   }

      //   for (const [, snippet] of banned_snippets.entries()) {
      //     let found = item.snippet.indexOf(snippet) >= 0 ? true : false;

      //     if (found) {
      //       found_list.push(item.mid);
      //       continue;
      //     }
      //   }

      //   for (const [, extra_flag] of extra_flags.entries()) {
      //     if (item.extra_flags !== null) {
      //       let found = item.extra_flags.indexOf(extra_flag) >= 0 ? true : false;

      //       if (found) {
      //         found_list.push(item.mid);
      //         continue;
      //       }
      //     }
      //   }

      //   for (const [, flag] of flags.entries()) {
      //     let found = item.flags.indexOf(flag) >= 0 ? true : false;

      //     if (found) {
      //       found_list.push(item.mid);
      //       continue;
      //     }
      //   }
    }

    return found_list;
  };

  const do_ajax = async () => {
    return $.ajax({
      url:
        "https://api.poczta.onet.pl/api/mail?sortDir=desc&sort=date&page=" +
        page +
        "&limit=" +
        limit +
        "&withLabels=1&withTotalCount=1&folderId=" +
        folder,
      method: "GET",
      crossDomain: true,
      dataType: "json",
      contentType: "application/json; charset=utf-8",
      xhrFields: {
        withCredentials: true,
      },
      success: e => {
        if (total_count === 0) {
          total_count = e.total_count;
          total_page = Math.ceil(total_count / limit);
        }
      },
    });
  };

  const execute = async () => {
    let res = await do_ajax();
    let found_list = await on_response(res);

    return found_list;
  };

  const initialize = () => {
    execute().then(list => {
      banned_list = [...banned_list, ...list];

      $.ajax({
        url: "https://api.poczta.onet.pl/api/mail/?mailsGroup=1",
        method: "PATCH",
        crossDomain: true,
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        xhrFields: {
          withCredentials: true,
        },
        data: JSON.stringify({
          dstFolder: 47461,
          srcMails: {
            //76728: list,
            47460: banned_list,
          },
        }),
      });

      if (page < total_page) {
        page++;
        initialize();
        return;
      }

      console.log(banned_list);
    });
  };

  initialize();
})(jQuery);
