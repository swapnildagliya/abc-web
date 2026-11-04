from pathlib import Path
import subprocess
import sys
ROOT=Path(__file__).resolve().parents[1]
OUT=ROOT/'assets/media/booking'
OUT.mkdir(parents=True,exist_ok=True)
MEDLEY=Path('/Users/swapnil/Movies/Bollywood & ABC/ABC Bollywood Dance  Item Song Medley (Desi Girl, Namak, Ghagra)  Gent India Dans Festival 2025.mp4')
GARBA=Path('/Users/swapnil/Library/CloudStorage/GoogleDrive-info@shoonyadance.com/My Drive/Swapnil Dagliya — Toulouse 2026/Video/Videos/Performances/Garba ABC a bollywood company.mp4')
GHOOMAR=GARBA.with_name('Ghoomar ABC a bollywood company.mp4')
RAATAAN=MEDLEY.with_name('Raataan Lambiyan Dance Cover  Bollywood at Minard Theatre Ghent  ABC by Swapnil Dagliya .mp4')
# Existing company footage only. Six seconds per source supports the site's
# 3-second display plus crossfade and preload. Original sources remain intact.
CLIPS=[('desi-girl',MEDLEY,60),('ghagra',MEDLEY,108),('namak',MEDLEY,287.5),('garba',GARBA,35),('ghoomar',GHOOMAR,63),('raataan-lambiyan',RAATAAN,63)]
for name,source,start in CLIPS:
 if len(sys.argv)>1 and name not in sys.argv[1:]: continue
 for suffix,width in [('',640),('-hd',960)]:
  subprocess.run(['ffmpeg','-y','-hide_banner','-loglevel','error','-ss',str(start),'-i',str(source),'-t','6','-an','-vf',f'scale={width}:-2,fps=30','-c:v','libx264','-preset','fast','-crf','22','-pix_fmt','yuv420p','-movflags','+faststart',str(OUT/f'{name}{suffix}.mp4')],check=True)
 subprocess.run(['ffmpeg','-y','-hide_banner','-loglevel','error','-ss',str(start+.5),'-i',str(source),'-frames:v','1','-vf','scale=640:-2',str(OUT/f'{name}.jpg')],check=True)
print(OUT)
